$( document ).ready(function () {
  function maskTelForm() {
    function setCursorPosition(pos, elem) {
      elem.focus()
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
        var range = elem.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    }

    function mask(event) {
      var matrix = '__.__.____', i = 0, def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '')
      if (def.length >= val.length) val = def
      this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
      })
      if (event.type == 'blur') {
        if (this.value.length == 2) this.value = ''
      } else setCursorPosition(this.value.length, this)
    }

    let input = document.querySelector('.date')
    if (input) {
      input.addEventListener('input', mask, false)
      input.addEventListener('focus', mask, false)
      input.addEventListener('blur', mask, false)
    }

    function maskTel(event) {
      var matrix = "+ _ (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
            ? ""
            : a;
      });
      if (event.type == "blur") {
        if (this.value.length == 2) this.value = "";
      } else setCursorPosition(this.value.length, this);
    }
    const inputTel = document.querySelectorAll(".telmask");
    const inputArrayTel = Array.prototype.slice.call(inputTel);

    inputArrayTel.forEach(item => {
      item.addEventListener("input", maskTel, false);
      item.addEventListener("focus", maskTel, false);
      item.addEventListener("blur", maskTel, false);
    });

  }

  maskTelForm()
})
