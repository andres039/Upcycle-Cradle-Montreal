import React, { useState } from "react";


const Instructions = () => {
  return (
    <ul>
      {/* Example instructions to test the component */}
      <li key="1">To center the map at your location, please allow the browser to track your location.</li>
      <li key="2">To add an item to the map, click on the <strong>+New item</strong> button above.</li>
      <li key="3">Click on a pin to see the item details.</li>
    </ul>
  )
}
export default Instructions;