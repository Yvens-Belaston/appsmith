import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory/types";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";

import TestComponent from "../component";

import IconSVG from "../icon.svg";

class TestWidget extends BaseWidget<TestWidgetProps, WidgetState> {
  static type = "TEST_WIDGET";

  static getConfig() {
    return {
      name: "Test", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 0, // Index of the property pane "General" section
        active: false,
      },
    };
  }

  static getDefaults() {
    return {
      widgetName: "Test",
      rows: 1,
      columns: 3,
      version: 1,
    };
  }

  static getPropertyPaneContentConfig() {
    return [];
  }

  static getPropertyPaneStyleConfig() {
    return [];
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  getWidgetView() {
    return <TestComponent />;
  }
}

export interface TestWidgetProps extends WidgetProps {}

export default TestWidget;