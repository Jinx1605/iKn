# 🎨 iKn Icon Widget

An embeddable JavaScript widget for creating beautiful, OTF (On-The-Fly) editable icons that conform to Apple macOS and iOS design guidelines.

## ✨ Features

- 🍎 **Apple Design Compliance**: Icons follow macOS and iOS design principles
- 🎨 **Real-time Editing**: Edit icons on-the-fly with intuitive controls
- 🎯 **Easy Integration**: Drop-in widget for any website or application
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🌈 **Customizable**: Full control over colors, size, and styling
- 💾 **Export Functionality**: Download icons as high-quality PNG files
- 🚀 **Lightweight**: No dependencies, pure JavaScript
- ♿ **Accessible**: Built with accessibility best practices

## 🚀 Quick Start

### 1. Include the Widget

```html
<script src="icon-widget.js"></script>
```

### 2. Create a Container

```html
<div id="my-icon-widget"></div>
```

### 3. Initialize the Widget

```javascript
const widget = new IconWidget('my-icon-widget', {
    size: 100,
    backgroundColor: '#007AFF',
    iconColor: '#FFFFFF',
    cornerRadius: 22,
    shadowEnabled: true,
    editable: true
});
```

## 🎛️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | number | `100` | Icon size in pixels |
| `backgroundColor` | string | `'#007AFF'` | Background color (hex, rgb, etc.) |
| `iconColor` | string | `'#FFFFFF'` | Icon color (hex, rgb, etc.) |
| `cornerRadius` | number | `22` | Corner radius in pixels |
| `shadowEnabled` | boolean | `true` | Enable shadow effects |
| `editable` | boolean | `true` | Enable editing controls |

## 📋 Available Icons

The widget comes with these built-in icons:
- 🏠 Home
- ❤️ Heart  
- ⭐ Star
- ⚙️ Settings
- 👤 User
- ✉️ Mail

## 🎯 API Methods

```javascript
// Set a specific icon
widget.setIcon('heart');

// Update colors
widget.setBackgroundColor('#34C759');
widget.setIconColor('#FFFFFF');

// Update corner radius
widget.setCornerRadius(16);

// Get current configuration
const config = widget.getConfiguration();
```

## 🎨 Design Philosophy

This widget follows Apple's Human Interface Guidelines:

- **Rounded Corners**: iOS-style rounded rectangles
- **Shadow Effects**: Subtle depth with appropriate shadows
- **Color Harmony**: Uses Apple's system colors as defaults
- **Typography**: San Francisco font stack for consistency
- **Interactions**: Smooth animations and hover effects
- **Accessibility**: Proper contrast ratios and semantic markup

## 🌟 Demo

Open `demo.html` in your browser to see the widget in action with various configurations and styling options.

## 🛠️ Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
