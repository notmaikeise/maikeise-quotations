# Maikeise Quotations — Design System v0.1

**Organization:** Maikeise  
**Product:** Maikeise Quotations  
**Version:** 0.1  
**Date:** September 16, 2026  
**Status:** In Development

## 1. Purpose

This document defines the initial visual direction and user experience
principles for Maikeise Quotations.

The interface aims to combine the structure and reliability of corporate
software with a minimalist and premium presentation, prioritizing clarity,
readability, accessibility, and ease of use.

## 2. Design Principles

The system will be developed according to the following principles:

- Clarity should take priority over information density.
- Important actions must be easy to identify.
- Related information should be visually grouped.
- The interface must not rely exclusively on color to communicate states.
- Interactive elements should provide comfortable click and touch areas.
- Navigation should remain simple and predictable.
- Animations should support interface comprehension without becoming
  distracting.
- Technical data should be visually distinguishable from regular
  interface text.

## 3. Users and Accessibility

The interface should remain comfortable for older users and users with
limited familiarity with administrative software.

For this reason, the project prioritizes:

- Legible typography;
- Comfortable font sizes;
- Larger form controls;
- Adequate contrast;
- Clearly visible focus states;
- Keyboard navigation;
- Messages that include text and do not rely exclusively on color;
- Support for `prefers-reduced-motion`;
- Consistent spatial organization.

Accessibility should be treated as a design requirement rather than a
feature added after implementation.

## 4. Visual Direction

The visual identity combines characteristics of:

- Corporate software;
- Minimalist interfaces;
- Premium and editorial design.

Enterprise systems such as SAP are used as references for information
organization, predictability, and readability without directly reproducing
their visual identity.

The product should maintain its own visual language as part of the
Maikeise identity.

## 5. Initial Color Palette

| Token | Color | Intended Use |
|---|---|---|
| Primary | `#203740` | Navigation, headings, and primary interface elements |
| Accent | `#F2A81D` | Highlights, selections, and important actions |
| Background | `#F2F2F2` | Main application background |

Additional colors for surfaces, text, borders, success, warning, and error
states will be defined as derived design tokens during implementation.

The Accent color should be used intentionally and should not become the
dominant color of the interface.

## 6. Typography

The interface will use a highly legible sans-serif typeface for navigation,
forms, content, and general interface elements.

Technical information may use a monospaced typeface, including:

- RFP identifiers;
- Item codes;
- NCM codes;
- Internal identifiers.

This distinction should make technical data easier to recognize and scan.

The final typeface families will be documented after implementation and
visual testing.

## 7. Application Structure

The application will use horizontal navigation.

The primary navigation structure will contain:

- Maikeise identity;
- Search;
- New Quotation;
- PT/EN language selector.

The Search screen will be the application's default screen.

A persistent sidebar is not planned for the initial version.

## 8. Forms

Forms will use:

- Labels positioned above fields;
- Spacious input controls;
- Slightly rounded borders;
- Context-based information grouping;
- Generous spacing between controls.

Quotation registration will be organized into panels:

1. Identification;
2. Values;
3. Commercial Information;
4. Additional Data.

All relevant registration information should remain visible within a
structured page instead of being separated into a multi-step wizard.

## 9. Interface Feedback

After successfully registering a quotation, the application should provide:

1. A toast confirming the operation;
2. A summary of the newly created quotation.

Feedback should clearly communicate the result of an action without
requiring the user to infer success from changes elsewhere in the
interface.

Possible duplicate quotations should be presented before persistence,
allowing the user to confirm or cancel the operation.

## 10. Internationalization

The interface will initially support Portuguese and English.

Visible interface strings should not be coupled directly to business logic,
allowing the application language to be switched between PT and EN.

The user's language preference may be persisted locally in the browser.

The internationalization structure should allow additional languages to be
introduced in the future without requiring significant changes to the
application architecture.

## 11. Motion

The application may use noticeable but professional transitions.

Animations should:

- Communicate state changes;
- Provide useful feedback;
- Avoid unnecessary decorative movement;
- Respect `prefers-reduced-motion`.

Motion should never be required to understand an action or system state.

## 12. Evolution

This document represents Design System v0.1.

Design tokens, components, typography, spacing, and interaction patterns may
change as the interface is implemented and tested.

Relevant changes should be documented in future versions of this document.

Exact values for elements such as border radius, spacing scales, shadows,
and typography will be documented after they have been validated during
implementation.