// Wraps every "Onyx Renders" in bold, in any capitalisation ("ONYX RENDERS",
// "Onyx Renders", ...). The original spelling is kept. Returns an HTML string.
export const boldOnyxRenders = (text: string) => {
    return text
      .split(/(onyx renders)/i)
      .map((part: string, index) =>
        index % 2 === 1
          ? `<strong class="font-bold">${part}</strong>`
          : part
      )
      .join('');
  };
