**js-slider**

Native JavaScript Slider

Example - https://muskos.github.io/js-slider/

Browser support - chrome, ff, edge, opera, ie11

````
let caseSliderContainer = document.getElementById('jsSlider'),
  caseSliderContainer2 = document.getElementById('jsSlider2');

    new Slider(caseSliderContainer);
    new Slider(caseSliderContainer2);
````
**Settings**
<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Example</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>buttons</td>
            <td>object</td>
            <td>
              next: {
                classname: 'next'
              },
              prev: {
                classname: 'prev'
              }
            </td>
            <td></td>
            <td>
                Set classname for button
            </td>
        </tr>
        <tr>
            <td>counts</td>
            <td>object</td>
            <td>desktop: {
                width: 1024,
                count: 3
              },
              tablet: {
                width: 768,
                count: 3
              },
              mobile: {
                width: 400,
                count: 1
              },</td>
            <td></td>
            <td>Count of slide in view (on desktop, tablet and mobile)</td>
        </tr>
        <tr>
            <td>slidesToScroll</td>
            <td>string</td>
            <td>auto</td>
            <td>123</td>
            <td>
                # of slides to scroll at a time
                auto = count of slides in view
                any other variable - one slide
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>