import React, { Fragment, PureComponent } from 'camunda-modeler-plugin-helpers/react';
import { Fill } from 'camunda-modeler-plugin-helpers/components';
import classNames from 'classnames';

export default class SavePlugin extends PureComponent {
  constructor(app) {
    super();
    this.app = app;
    this.fileSystem = this.app._getGlobal("fileSystem");
    this._buttonRef = React.createRef();
  }

  async saveFileThroughFilePicker(){
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName:"New_save_file.json",
        types: [{
          description: '.json',
          accept: {'application/json': ['.json']},
        }],
      });
      const file = await handle.getFile();
      const contents = await file.text();

      debugger;
      // Write to the file.
      const writable = await handle.createWritable();
      await writable.write("Hello World");
      await writable.close();
      return;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err.name, err.message);
        return;
      }
    }

  }

  // Attempt of using the FileSystem from the camunda modeler App.
  // Doesn't seem to work.
  async saveFile2(){
    this.fileSystem.writeFile("~/TextFile.txt","Hello World",);
  }

  render() {
    return <Fragment>
      <Fill slot="status-bar__app" group="1_save">
        <button
          ref={ this._buttonRef }
          className={ classNames('btn') }
          onClick={ () =>  this.saveFileThroughFilePicker()}>
          Save as ... 
        </button>
      </Fill>
    </Fragment>;
  }
}

SavePlugin.$inject = [
  'app'
];