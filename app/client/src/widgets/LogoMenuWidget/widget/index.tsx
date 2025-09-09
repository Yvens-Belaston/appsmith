import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory/types";
import { ValidationTypes } from "constants/WidgetValidation";
import BaseWidget, {
  type WidgetProps,
  type WidgetState,
} from "widgets/BaseWidget";
import { WIDGET_TAGS } from "constants/WidgetConstants";

import LogoMenuComponent from "../component";

import IconSVG from "../icon.svg";

class LogoMenuWidget extends BaseWidget<LogoMenuWidgetProps, WidgetState> {
  constructor(props: LogoMenuWidgetProps) {
    super(props);
  }
  static type = "LOGO_MENU_WIDGET";

  static getConfig() {
    return {
      name: "Custom Bonita Menu", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      tags: [WIDGET_TAGS.EXTERNAL],
      searchTags: ["logo", "logo menu", "menu"],
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 0, // Index of the property pane "General" section
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      // isVisible: true,
      widgetName: "Logo Menu",
      rows: 1,
      columns: 3,
      version: 1,
      logo: JSON.stringify(
        {
          src: "https://cdn.prod.website-files.com/678e6d991abe09b73901f4b3/6792c463fa1ee0936b0d5750_symbol.svg",
          alt: "alt text",
          textFallback: "fallback",
        },
        null,
        2,
      ),
      links: JSON.stringify(
        [
          {
            label: "Solutions",
            href: "/",
            onClick: () => console.log("Solutions Link clicked"),
          },
          {
            label: "Plateformes",
            href: "/",
            onClick: () => console.log("Plateformes Link clicked"),
          },
          {
            label: "Ressources",
            href: "/",
            onClick: () => console.log("Ressources Link clicked"),
          },
        ],
        null,
        2,
      ),
      dynamicPropertyPathList: [{ key: "links" }, { key: "logo" }],
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "isVisible",
            label: "Visible",
            helpText: "Show or hide the widget",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            // validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: "Data",
        children: [
          {
            propertyName: "links",
            label: "Links",
            helpText: "List of links",
            controlType: "ONE_CLICK_BINDING_CONTROL",
            controlConfig: {
              links: JSON.stringify(
                [
                  {
                    label: "Solutions",
                    href: "/",
                    onClick: () => console.log("Solutions Link clicked"),
                  },
                  {
                    label: "Plateformes",
                    href: "/",
                    onClick: () => console.log("Plateformes Link clicked"),
                  },
                  {
                    label: "Ressources",
                    href: "/",
                    onClick: () => console.log("Ressources Link clicked"),
                  },
                ],
                null,
                2,
              ),
            },
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
            },
          },
          {
            propertyName: "logo",
            label: "Logo config",
            helpText: "The config of the logo",
            controlType: "ONE_CLICK_BINDING_CONTROL",
            controlConfig: {
              logo: JSON.stringify(
                {
                  src: "https://cdn.prod.website-files.com/678e6d991abe09b73901f4b3/6792c463fa1ee0936b0d5750_symbol.svg",
                  alt: "alt text",
                  textFallback: "fallback",
                },
                null,
                2,
              ),
            },
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.OBJECT,
            },
          },
        ],
      },
    ];
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
    console.log('&&&&&&&&&&& this.props.logo:', this.props)
    return (
      <LogoMenuComponent
        logo={this.props.logo || {src: "", alt: "alt text", textFallback:"fallback"}}
        links={this.props.links || []}
        sticky={true}
        backgroundColor={"#0B142F"}
        textColor={"white"}
        accentColor={"#7F00FF"}
        borderRadius={"6px"}
        boxShadow={"none"}
      />
    );
  }
}

export interface LogoMenuWidgetProps extends WidgetProps {
  logo: { src: string; alt: string; textFallback: string };
  links: { label: string; href: string; onClick: () => {} }[];
}

export default LogoMenuWidget;
