const processCSV = (text: string) => {
    const lines = text.split("\n");
    const dataLines = lines.slice(1).filter(l => l.trim() !== "");
    
    const allEvents: { date: Date; action: string; asset: string; qty: number; amount: number; fee: number }[] = [];
    let currentEvent: any = null;
    const feeKeywords = ["commission", "clearing", "vat", "fee", "tax", "sec", "finra"];

    for (const line of dataLines) {
      const delimiter = line.includes(";") ? ";" : ",";
      const parts = line.split(delimiter);
      if (parts.length < 3) continue;

      const dateStr = parts[0].trim();
      // Skip lines that don't look like dates
      if (!dateStr || dateStr.length < 8) continue; 

      let comment = parts[1].replace(/^"|"$/g, "").trim(); 
      let amountStr = parts[2].trim().replace(",", "."); 
      const amount = parseFloat(amountStr) || 0;
      const date = new Date(dateStr.replace(/\//g, "-"));

      // SKIP this row if the date is invalid
      if (isNaN(date.getTime())) continue;

      const commentLower = comment.toLowerCase();
      const isBuy = comment.startsWith("Bought ");
      const isSell = comment.startsWith("Sold ");
      const isFee = feeKeywords.some(keyword => commentLower.includes(keyword));

      if (isBuy || isSell) {
        const action = isBuy ? "Buy" : "Sell";
        const withoutAction = comment.replace(/^(Bought|Sold) /, "").trim();
        const atParts = withoutAction.split(" @ ");
        
        if (atParts.length >= 2) {
          const leftSide = atParts[0].trim().split(" ");
          const qtyStr = leftSide.pop() || "0";
          const qty = parseFloat(qtyStr.replace(",", "."));
          const assetName = leftSide.join(" ").trim();

          if (qty > 0 && assetName) {
            currentEvent = { date, action, asset: assetName, qty, amount, fee: 0 };
            allEvents.push(currentEvent);
          }
        }
      } else if (isFee && currentEvent) {
        currentEvent.fee += Math.abs(amount);
      } else {
        currentEvent = null;
      }
    }
    // ... (rest of the FIFO logic remains exactly the same)
