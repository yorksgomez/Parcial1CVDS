let editingElement;

function retrieveEditorData(element) {
  let type = element.getAttribute("editorjs-type"),
      datasrc = element.getAttribute("editorjs-datasrc"),
      old = element.getAttribute('editorjs-old'),
      name = element.getAttribute('editorjs-name'),
      options = element.getAttribute('editorjs-options'),
      elementsrc = element,
      id = elementsrc.closest('.product_line').getElementsByClassName('hidden_id')[0].innerText,
      content;

  options = options != null ? options.split(",").map(function(v) { return v.split("="); }) : null;

  return {
    type: type,
    datasrc: datasrc,
    old: old,
    elementsrc: elementsrc,
    name: name,
    content: content,
    options: options,
    id: id
  };

}

function clearView() {

  if(editingElement != null) {
    let data = retrieveEditorData(editingElement),
        childs = editingElement.childNodes;

    editingElement.childNodes.forEach((child) => editingElement.removeChild(child));

    switch(data.datasrc) {
      case 'value':
        data.elementsrc.value = data.old;
        break;
      case 'text':
        data.elementsrc.innerHTML = data.old;
        break;
    }

  }

  editingElement = null;
}

function cancelEditing() {
  clearView();
}

function editorjsInit(whatDoNext, form) {
  let editables = form.getElementsByClassName("editorjs-editable"), el;

  let changeView = function(event) {
    event.stopPropagation();

    let element = event.srcElement.closest(".editorjs-editable"),
        data = retrieveEditorData(element),
        old;

    editingElement = element;

    switch(data.datasrc) {
      case 'value':
        old = data.elementsrc.value;
        break;
      case 'text':
        old = data.elementsrc.getElementsByClassName('content')[0].outerHTML;
        break;
    }

    element.setAttribute("editorjs-old", old);

    switch (data.type) {
      case 'text':
        el = document.createElement("input");
        el.setAttribute("type", "text");
        el.addEventListener('keyup', function(e) {

          if(e.key == 'Enter') {
            let text = e.srcElement.value;
            data.content = text;

            whatDoNext(e, data);

            clearView();

            data.elementsrc.getElementsByClassName('content')[0].innerText = text;
          }

        });
        break;
      case 'option':
        el = document.createElement("select");
        el.addEventListener('change', function(e) {
          let selected = e.srcElement.innerText;
          data.content = selected;

          whatDoNext(e, data);

          clearView();

          data.elementsrc.getElementsByClassName('content')[0].innerText = selected;
        });
        for(let c of data.options) {
          let op = document.createElement("option");
          op.setAttribute("value", c[0]);
          op.innerText = c[1];


          el.appendChild(op);
        }

        break;
    }

    element.childNodes.forEach((child) => element.removeChild(child));

    el.addEventListener('click', function(e) {e.stopPropagation();});
    element.appendChild(el);
  };

  Array.from(editables).forEach((editable) => editable.addEventListener('dblclick', changeView));
}

document.getElementsByTagName("html")[0].addEventListener('click', cancelEditing);
