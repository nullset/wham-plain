<script lang="ts">
  import 'emoji-picker-element';
  import { defaultStyle, generateFavicon } from '../lib/templates';

  import {items} from '../store';

  // TODO: Replace this with a call to storage
  // export let item = {key: 'new', url: 'https://big.aha.io', iconCSS: '', iconHTML: '', siteCSS: '', siteJS: '', hue: 0, urlIsRegex: false}; 
  // export let item;
  // item ||= {key: crypto.randomUUID(), url: 'https://big.aha.io', iconCSS: '', iconHTML: '', siteCSS: '', siteJS: '', hue: 0, urlIsRegex: 0}; 
  
  
  // let {key, url, iconCSS, emoji, iconHTML, siteCSS, siteJS, hue, urlIsRegex} = item;

  export let key: string;
  export let url: string = 'https://big.aha.io';
  export let iconCSS: string = defaultStyle;
  export let emoji: string = '❔';
  export let iconHTML: string = '';
  export let siteCSS: string = '';
  export let siteJS: string = '';
  export let hue: number = 0;
  export let urlIsRegex: boolean = false;
  export let open: boolean = false;

  let originalEmoji = emoji;
  let originalHue = hue;

  $: icon = generateFavicon({size: 16, styles: iconCSS, html: emoji, hue});
  $: icon24 = generateFavicon({size: 24, styles: iconCSS, html: emoji, hue}); 
  $: icon128 = generateFavicon({size: 128, styles: iconCSS, html: emoji, hue});
  $: base64Icon = icon && `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(icon)))}`;

  $: originalIcon24 = generateFavicon({size: 24, styles: iconCSS, html: originalEmoji, hue: originalHue}); 

  let textareaElem: HTMLTextAreaElement;

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log({formData, formProps});
    
    originalEmoji = formProps.emoji;
    originalHue = formProps.hue;

    
    window.dispatchEvent(new CustomEvent('setItem', {detail: formProps}));
  }

  function resetToDefault() {
    textareaElem.value = defaultIcon;
  }

  function updateIconHTML(e) {
    iconHTML = e.target.value;
  }

  function updateIconCSS(e) {
    iconCSS = e.target.value;
  }

  function undateSiteCSS(e) {
    siteCSS = e.target.value;
  }

  function updateSiteJS(e) {
    siteJS = e.target.value;
  }

  window.addEventListener('emoji-click', event => {
    emoji = event.detail.unicode;
    showPicker = false;
  });

  let showPicker = false;

  async function confirmDelete() {
    if (confirm('Are you sure you want to delete this item?')) {
      window.dispatchEvent(new CustomEvent('deleteItem', {detail: key}));
    }
  }

</script>

  <form on:submit={handleSubmit}>
    <details open={open}>
      <summary style="display: flex; ">
        {@html originalIcon24}
        {url}
      </summary>

      <div style="margin-left: 30px;">
        <dl>
          <dt>
            <label for="{key}-url">URL:</label>
          </dt>
          <dd>
            <input type="url" name="url" id="{key}-url" value={url || ''} />
            <label>
              <input type="hidden" name="urlIsRegex" value="0" />
              <input type="checkbox" name="urlIsRegex" checked={Boolean(Number(urlIsRegex))} value="1" /> Is RegExp
            </label>
          </dd>
        </dl>
    
        <details>
          <summary>
            Icon
          </summary>
          <div class="layout">
          
            <dl>
              <dt>
                Emoji:
              </dt>
              <dd>
                <button type="button" style="all: unset; cursor: pointer; font-size: 3rem;" on:click={e => showPicker = !showPicker}>

                  <div class="previews">
                    <figure>
                      {@html icon128}
                      <figcaption>Zoomed</figcaption>
                    </figure>
              
                    <figure>
                      {@html icon}
                      <figcaption>Actual</figcaption>
                    </figure>
              
                    <figure>
                      <img src="{base64Icon}" />
                      <figcaption>Base64 icon</figcaption>
                    </figure>
                  </div>
                </button>

                <emoji-picker popover hidden={showPicker ? false: true}></emoji-picker>    

              </dd>
    
              <dt>
                <label for="">Hue:</label>
              </dt>
              <dd>
                <input type="range" name="hue" min="0" max="359" step="1" value={hue} on:input={e => {hue = Number(e.target.value)}}>
              </dd>
      
              <!-- <dt>
                <label for="{key}-icon">Icon:</label>
              </dt>
              <dd>
                <textarea name="icon" id="{key}-icon" bind:this={textareaElem} value={icon || defaultIcon}></textarea>
              </dd>
      
              <dt>Output:</dt>
              <dd>
                {@html icon}
              </dd> -->
      
      
              <dt>
                <label for="{key}-iconCSS">CSS:</label>
              </dt>
              <dd>
                <textarea name="iconCSS" id="{key}-iconCSS" on:input={updateIconCSS}>{iconCSS?.trim()}</textarea>
              </dd>
      
            </dl>
            <div>
            </div>    
          </div>
        </details>
    
        <details>
          <summary>Website</summary>
          <p>Note that both custom CSS and custom JS are appended at the bottom of the <code>&lt;body&gt;</code> tag, and therefore will be the last bits of code to execute on a newly loaded page.</p>
    
          <dl>
            <dt>
              <label for="{key}-siteCSS">Custom CSS</label>
            </dt>
            <dd>
              <textarea name="siteCSS" id="{key}-siteCSS">{siteCSS?.trim()}</textarea>
            </dd>
    
            <dt>
              <label for="{key}-siteJS">Custom JS</label>
            </dt>
            <dd>
              <textarea name="siteJS" id="{key}-siteJS">{siteJS?.trim()}</textarea>
            </dd>
          </dl>
          
        </details>
    
        <dl>
          <dt></dt>
          <dd>
            <input type="hidden" name="key" value={key} />
            <input type="hidden" name="emoji" value={emoji} />
            <input type="hidden" name="iconHTML" value={icon} />
            <!-- https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte -->
            <input type="hidden" name="icon" value={base64Icon} />
            <button type="submit">Save</button>
            <bunton type="button" on:click={confirmDelete}>Delete</bunton>
          </dd>
    
        </dl>
      </div>
    </details>
   
    
  </form>


<style>
  *, *:before, *:after {
    box-sizing: border-box;
  }
  .layout {
    display: flex;
    gap: calc(2 * var(--spacer));
    & dl {
      flex: 1 1;
    }
  }
  form dl {
    display: grid;
    grid-template-columns: max-content auto;
    gap: 2ch;
    align-items: baseline;
  }

  form :is(dt, dd) {
    margin: 0;
  }
  form dd {
    display: flex;
    gap: 1rem;
  }
  form dt {
    text-align: right;
    align-self: self-start;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    resize: vertical;
    height: 14lh;
  }
  .previews {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    position: sticky;
    top: var(--spacer);
  }
  figure {
    margin: 0;
    text-align: center;
  }
  figcaption {
    text-align: center;
    font-size: small;
  }
</style>
