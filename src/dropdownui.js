/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module dropdown/dropdownui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import genericIcon from '../theme/icons/generic-dropdown.svg'

const dropdowns = {}

export function DropdownCreator(name) {
  dropdowns[name] = dropdowns[name] || {}

  return class extends DropdownUI {

    /**
     * @inheritDoc
     */
    static get pluginName() {
      return `DropdownUI:${name}`
    }

    constructor(editor) {
      super(editor)
      this.name = name
      dropdowns[name].instance = this
    }
  }
}

export function dropdownUI(name) {
  dropdowns[name] = dropdowns[name] || {}

  return {
    set: (data) => {
      dropdowns[name].data = data
      return `dropdownUI:${name}`
    }
  }
}



const defaultDropdownData = {
    title: 'Select option',
    dynamicIcon: true,
    icon: genericIcon,
    isVertical: undefined,
    options: []
}

/**
 * The generic dropdown UI plugin.
 *
 * @extends module:core/plugin~Plugin
 */
class DropdownUI extends Plugin {

  /**
   * @inheritDoc
   */
  init() {
    const data = {
        name: this.name,
        ...defaultDropdownData,
        ...dropdowns[this.name].data
    }

    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const t = editor.t;

    componentFactory.add(`dropdownUI:${data.name}`, locale => {
      const dropdownView = createDropdown(locale);

      // Add existing command buttons to dropdown's toolbar.
      const buttons = data.options.map(option => {
        const commandName = option.indexOf(':') > -1 ? option : `${data.name}:${ option }`
        return componentFactory.create(commandName)
      });
      addToolbarToDropdown(dropdownView, buttons);

      // Configure dropdown properties an behavior.
      dropdownView.buttonView.set({
        label: data.title,
        icon: data.icon,
        tooltip: true
      });

	  if( data.isVertical === undefined ) {
		  dropdownView.toolbarView.isVertical = data.options.length <= 3;
	  }else{
		  dropdownView.toolbarView.isVertical = data.isVertical;
	  }

      dropdownView.extendTemplate({
        attributes: {
          class: 'ck-generic-dropdown'
        }
      });

      // or change icon to reflect current selection's option.
      if (data.dynamicIcon) dropdownView.buttonView.bind('icon').toMany(buttons, 'isOn', (...areActive) => {
        // Get the index of an active button.
        const index = areActive.findIndex(value => value);

        // If none of the commands is active, display either defaultIcon or the first button's icon.
        if (index < 0) return data.icon;

        // Return active button's icon.
        return buttons[index].icon;
      });

      // Enable button if any of the buttons is enabled.
      dropdownView.bind('isEnabled').toMany(buttons, 'isEnabled', (...areEnabled) => areEnabled.some(isEnabled => isEnabled));

      return dropdownView;
    });
  }

}
