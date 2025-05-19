import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class Progresscontrol implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _animateFill: boolean;
    private _barColour: string;
    private _fontSize?: number;


    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;

        // Read parameters
        this._animateFill = context.parameters.animateFill?.raw ?? true;
        const rawColor = context.parameters.barColour?.raw?.trim();
        this._barColour = (rawColor && rawColor !== "val" && rawColor.trim().length > 0) 
        ? rawColor 
    : "#000080";
        this._fontSize = context.parameters.fontSize?.raw ?? 12;
        this.render(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update parameter values on context changes
        this._animateFill = context.parameters.animateFill?.raw ?? true;
        const rawColor = context.parameters.barColour?.raw?.trim();
        this._barColour = (rawColor && rawColor !== "val" && rawColor.trim().length > 0) 
        ? rawColor 
    : "#000080";
        this._fontSize = context.parameters.fontSize?.raw ?? 12;
        this.render(context);
    }

    private render(context: ComponentFramework.Context<IInputs>): void {
        const value = context.parameters.progressMeasure.raw ?? 0;
        const maxValue = context.parameters.maxValue.raw ?? 100;
        const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

        this._container.innerHTML = "";

        // Create elements
        const wrapper = document.createElement("div");
        wrapper.className = "progress-wrapper";

        const title = document.createElement("div");
        title.className = "progress-title";
        title.textContent = "0% Complete";
        title.style.fontSize = this._fontSize && this._fontSize > 0 ? `${this._fontSize}px` : "12px";

        const barBg = document.createElement("div");
        barBg.className = "progress-bar-bg";

        const fill = document.createElement("div");
        fill.className = "progress-bar-fill";
        fill.style.width = `${percentage}%`;

        if (this._animateFill) {
            fill.classList.add("gradient");
        } else {
        const rawColor = context.parameters.barColour?.raw?.trim();
        this._barColour = (rawColor && rawColor !== "val" && rawColor.trim().length > 0) 
        ? rawColor 
    : "#000080";
            fill.style.backgroundColor = this._barColour;
        }

        // Assemble DOM
        barBg.appendChild(fill);
        wrapper.appendChild(title);
        wrapper.appendChild(barBg);
        this._container.appendChild(wrapper);

        // Animate label
        this.animateCounter(value, maxValue, title);
    }

    private animateCounter(currentValue: number, maxValue: number, title: HTMLElement): void {
        let current = 0;
        const targetPercent = Math.round((currentValue / maxValue) * 100);

        const interval = setInterval(() => {
            const displayed = Math.min(current, targetPercent);
            title.textContent = `${displayed}% Complete`;

            if (displayed >= targetPercent) {
                clearInterval(interval);
            }

            current += 1;
        }, 20);
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Cleanup logic if necessary
    }
}
