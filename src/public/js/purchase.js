const purchaseButton = document.getElementById("purchaseButton");
const cid = purchaseButton.dataset.cid;
purchaseButton.addEventListener("click", async () => {
  
  try {    
    const response = await fetch(`/api/carts/${cid}/purchase`, {
      method: "POST",
    });    
    if (response.ok) {      
      console.log("Gracias por comprar en Pets");
      location.reload();
    } else {      
      console.error("Error al realizar la compra");
    }
  } catch (error) {    
    console.error("Error en la solicitud de compra", error);
  }
});