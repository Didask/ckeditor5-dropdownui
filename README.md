CKEditor 5 generic dropdown UI feature
========================================

This package implements generic dropdown UI feature for CKEditor 5.

## Disclaimer

It's an early release:
No tests and no much documentation at the moment.

Feel free to contribute !

## Demo

![dropdown-for-anything](https://user-images.githubusercontent.com/1178625/42154152-506681f2-7de5-11e8-884b-83f83a844cf2.gif)

## Documentation

### Installation

```sh
npm i ckeditor5-dropdownui
```

### Usage

The plugin has two methods to call from the config.
- `DropdownCreator` creates a command from the `plugins` section
- `dropdownUI` populate its config directly from a `toolbar` section and returns the dropdown command.

It doesn't create subcommand on the fly, but use command already existing in the build.

The name of the dropdown can be seen as a prefix for commands,
here, the 'alignLeft' option in the 'imageStyle' dropdown will call 'imageStyle:alignLeft'.
But you can put a ':' in the option name, and the name of the command will be used as is.

Implem looks like this :

```js
import {DropdownCreator, dropdownUI} from 'ckeditor5-dropdownui/src/dropdownui'

export default {

    plugins: [
        ...
        DropdownCreator('imageStyle'),
        DropdownCreator('mediaWidth'),
		DropdownCreator('allIWant')
        ...
    ],

    toolbar: [
        ...
        dropdownUI('imageStyle').set({
            title: 'Select image alignment',
            icon: alignOptionsIcon,
            options: [
                'alignLeft',
                'alignCenter',
                'alignRight'
            ]
        }),
		dropdownUI('mediaWidth').set({
            title: 'Select media width',
            icon: widthOptionsIcon,
            dynamicIcon: false,
            options: [
               'full',
               'threeQuarters',
               'twoThirds',
               'half',
               'third',
               'quarter'
            ]
        }),
		dropdownUI('allIWant').set({
            title: 'Select media width',
            icon: widthOptionsIcon,
            dynamicIcon: false,
			isVertical: false,
            options: [
				'imageStyle:alignLeft',
				'imageStyle:alignCenter',
				'imageStyle:alignRight'
				'mediaWidth:full',
				'mediaWidth:threeQuarters',
				'mediaWidth:twoThirds',
				'mediaWidth:half',
				'mediaWidth:third',
				'mediaWidth:quarter'
            ]
        }),
        ...
    ],
```

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html). For full details about the license, please check the `LICENSE.md` file.
