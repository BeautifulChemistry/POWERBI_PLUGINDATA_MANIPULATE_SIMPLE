"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";


export class Visual implements IVisual {
    private target: HTMLElement;

    constructor(options: VisualConstructorOptions) {
        console.log("Visual constructor", options);
        this.target = options.element;
    }

    public update(options: VisualUpdateOptions): void {
        // Clear previous content
        this.target.innerHTML = "";
    
        // Extract values from the categorical data
        const categorical = options.dataViews[0]?.categorical;
        const YEAR = categorical?.categories[0]?.values || [];
        const MONTH = categorical?.categories[1]?.values || [];
        const DAY = categorical?.categories[2]?.values || [];
        const STATUS = categorical?.categories[3]?.values || [];
        const PrdSN = categorical?.categories[4]?.values || [];
    
        // Create and style elements to display the values
        const container = document.createElement("div");
        container.style.textAlign = "center";
        container.style.fontFamily = "Arial, sans-serif";
    
        // Make the container scrollable by setting a fixed height and enabling vertical scrolling
        container.style.height = "300px";  // Set the height as needed
        container.style.overflowY = "auto";  // Enable vertical scrolling
    
        // Loop through the arrays and display the values
        const maxLength = Math.max(YEAR.length, MONTH.length, DAY.length, STATUS.length, PrdSN.length);  // Get the maximum length of all arrays
        for (let index = 0; index < maxLength; index++) {
            const yearValue = YEAR[index]?.toString() || "N/A";
            const monthValue = MONTH[index]?.toString() || "N/A";
            const dayValue = DAY[index]?.toString() || "N/A";
            const statusValue = STATUS[index]?.toString() || "N/A";
            const prdSNValue = PrdSN[index]?.toString() || "N/A";
    
            const valueElement = document.createElement("p");
            valueElement.innerText = `Year: ${yearValue}, Month: ${monthValue}, Day: ${dayValue}, Status: ${statusValue}, PrdSN: ${prdSNValue}`;
    
            // Optional: Set different colors or styles for each value pair
            if (index % 2 === 0) {
                valueElement.style.color = "blue";
            } else {
                valueElement.style.color = "green";
            }
    
            container.appendChild(valueElement);
        }
    
        // Append the container to the target element
        this.target.appendChild(container);
    }
    
    
    
}
