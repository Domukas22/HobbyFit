function _CLOSEqntInput() {
  const qntInputPARENT = document.querySelector(".input_box.qnt");
  const qntInputFRONT = document.querySelector(".quantity_front");
  const qntInputBACK = document.querySelector(".quantity_back");

  console.log("ss");
  qntInputPARENT.dataset.box = "closed";
  qntInputBACK.style.opacity = "0%";
  qntInputFRONT.style.display = "flex";
  setTimeout(() => {
    qntInputFRONT.style.opacity = "100%";
  }, 70);
  setTimeout(() => {
    qntInputBACK.style.display = "none";
  }, 151);
  qntInputPARENT.style.height = "54px";
}

// on load
// QNT.GETqntInfo
// QNT.EDITEDITtextQnts
// QNT.HANDLEqntOptions

function ISvariantInBag(target_id) {
  const targetITEM = cartITEMS.find((x) => x.id == target_id);
  return {
    inCart: !!targetITEM ? targetITEM : false,
    qnt: !!targetITEM ? targetITEM.quantity : 0,
  };
}
return { IScartEmpty, ISvariantInBag };
