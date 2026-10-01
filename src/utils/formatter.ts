export const boldOnyxRenders = (text: string) => {
    return text
      .split(/(Onyx Renders)/)
      .map((part: string, index) => 
        part === "Onyx Renders" 
          ? `<strong class="font-semibold" key="${index}">${part}</strong>` 
          : part
      )
      .join('');
  };