import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class Progresscontrol implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;
        this.render(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.render(context);
    }

private render(context: ComponentFramework.Context<IInputs>): void {
    const value = context.parameters.progressMeasure.raw ?? 0;
    const maxValue = context.parameters.maxValue.raw ?? 100;
    const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

    this._container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "progress-wrapper";
    wrapper.innerHTML = `
        <div class="progress-title">0% Complete</div>
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
    `;

    this._container.appendChild(wrapper);
    this.animateCounter(value, maxValue);
}


    private animateCounter(currentValue: number, maxValue: number) {
    const title = this._container.querySelector(".progress-title") as HTMLElement;
    let current = 0;
    const targetPercent = Math.round((currentValue / maxValue) * 100);

    const interval = setInterval(() => {
        const displayed = Math.min(current, targetPercent);
        title.textContent = `${displayed}% Complete`;

        if (displayed >= targetPercent) {
            clearInterval(interval);
        }

        current += 1;
    }, 20); // Speed of the count-up
}


    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Cleanup if needed
    }
}
