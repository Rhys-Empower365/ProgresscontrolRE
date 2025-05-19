
# Progresscontrol PCF Component

A customizable progress bar control for Power Apps Component Framework (PCF) that visually displays progress with options for animated fill, color customization, and adjustable font size.

## Features

- Displays progress as a percentage of a maximum value.
- Option to animate the fill bar.
- Customizable bar color via hex code input.
- Adjustable font size for the progress label.
- Clean, responsive design with CSS styling.

## Installation

1. Clone or download this repository.
2. Build the component using the PCF CLI:

   ```bash
   npm install
   npm run build


3. Import the generated `.zip` solution into your Power Apps environment.

## Usage

### Properties

| Property          | Type            | Required | Description                                   | Default          |
| ----------------- | --------------- | -------- | --------------------------------------------- | ---------------- |
| `progressMeasure` | Whole.None      | Yes      | Current progress value.                       | N/A              |
| `maxValue`        | Whole.None      | Yes      | Maximum value representing 100%.              | N/A              |
| `animateFill`     | TwoOptions      | No       | Animate the fill bar (true/false).            | true             |
| `barColour`       | SingleLine.Text | No       | Hex color code for the bar (e.g., `#000080`). | `#000080` (navy) |
| `fontSize`        | Whole.None      | No       | Font size (in pixels) for progress label.     | 18               |

### Example

```tsx
// Within your PCF index.ts or React wrapper, bind the properties as needed.
```

### Notes

* If `animateFill` is set to true, the `barColour` input is disabled.
* If no `barColour` is provided, navy blue (`#000080`) is used as default.
* The progress label font size can be customized to fit your design needs.

## Development

* Source code located in `Progresscontrol/index.ts`
* Styles defined in `Progresscontrol/style.css`
* Manifest configured in `ControlManifest.Input.xml`

### Build & Deploy

```bash
npm install
npm run build
pac solution add-reference --path ./your-solution-folder
pac solution build
pac solution import --path ./your-solution.zip
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## Contact

Created by Rhys Evans - \[[rhys.evans@empower365.co.uk](mailto:rhys.evans@empwer365.co.uk)]

---

