# modal-component

```js
  (function(exports, doc) {
    function Modal(options) {
      var opt = options || {}
      this.size = opt.size || 'normal'
      this.childModalCallback = opt.childModalCallback && typeof opt.childModalCallback === 'function' ? opt.childModalCallback : null
      this.el = template(this.size)
      this.render()
      this.bindEvents()
    }
    Modal.prototype.render = function() {
      var self = this
      var body = doc.querySelector('body')
      body.appendChild(this.el)
      this.createOverlay();
      setTimeout(function() {
        self.el.classList.add('modal-on')
      }, 100)
    }
    Modal.prototype.bindEvents = function() {
      var self = this
      var overlay = doc.querySelector('.modal-overlay')
      var modalDialog = this.el.querySelector('.modal-dialog')
      this.el.querySelector('.makeModal').addEventListener('click', function(e) {
        if(self.childModalCallback) {
          self.childModalCallback()
        }
      }, false)
      this.el.querySelector('.modal-close').addEventListener('click', function(e) {
        e.preventDefault()
        self.destroy()
      }, false)
      overlay.addEventListener('click', function(e) {
        e.preventDefault()
        self.destroy()
      }, false)
      exports.addEventListener('resize', function(e) {
        // self.el.querySelector('.modal-dialog').
      }, false)
      // var isMouseDown = false
      var defaultX, defaultY = 0
      modalDialog.addEventListener('mousedown', function(e) {
        // isMouseDown = true
        defaultX = e.offsetX
        defaultY = e.offsetY
        this.style.cursor = 'move'
        ////
        this.addEventListener('mousemove', self.onMove , false)
        exports.addEventListener('mouseout', self.stopMove, false)
        exports.addEventListener('mouseup', self.stopMove, false)
      }, false)
      this.onMove = function(e) {
        console.log('onMove!!')
        var outWidth = (exports.innerWidth - this.offsetWidth) / 2
        var currentLeft = parseInt(this.style.left.replace('px', '')) || 0
        var x = currentLeft + e.offsetX - defaultX
        if(x > -outWidth && x < outWidth) {
          this.style.left = x + 'px'
        } else if(x < -outWidth) {
          this.style.left = -outWidth + 'px'
        } else if(x > outWidth) {
          this.style.left = outWidth + 'px'
        }
        var outHeight = exports.innerHeight - this.offsetHeight
        var curruntTop = parseInt(this.style.top.replace('px', '')) || 0
        var y = curruntTop + e.offsetY - defaultY
        if(0 < y && y < outHeight) {
          this.style.top = y + 'px'
        } else if(y < 0){
          this.style.top = 0
        } else if(outHeight < y) {
          this.style.top = exports.innerHeight - this.offsetHeight + 'px'
        }
      }
      this.stopMove = function(e) {
        console.log('stopMove!!')
        modalDialog.removeEventListener('mousemove', self.onMove, false)
        exports.removeEventListener('mouseout', self.stopMove, false)
        exports.removeEventListener('mouseup', self.stopMove, false)
        modalDialog.style.cursor = 'default'
      }
      // modalDialog.addEventListener('mousemove', function(e) {
      //   if(isMouseDown) {
      //     var outWidth = (exports.innerWidth - this.offsetWidth) / 2
      //     var currentLeft = parseInt(this.style.left.replace('px', '')) || 0
      //     var x = currentLeft + e.offsetX - defaultX
      //     if(x > -outWidth && x < outWidth) {
      //       this.style.left = x + 'px'
      //     } else if(x < -outWidth) {
      //       this.style.left = -outWidth + 'px'
      //     } else if(x > outWidth) {
      //       this.style.left = outWidth + 'px'
      //     }
      //     var outHeight = exports.innerHeight - this.offsetHeight
      //     var curruntTop = parseInt(this.style.top.replace('px', '')) || 0
      //     var y = curruntTop + e.offsetY - defaultY
      //     if(0 < y && y < outHeight) {
      //       this.style.top = y + 'px'
      //     } else if(y < 0){
      //       this.style.top = 0
      //     } else if(outHeight < y) {
      //       this.style.top = exports.innerHeight - this.offsetHeight + 'px'
      //     }
      //   }
      // }, false);
      // exports.addEventListener('mouseup', function(e) {
      //   isMouseDown = false;
      //   modalDialog.style.cursor = 'default'
      // }, false)
      // exports.addEventListener('mouseout', function(e) {
      //   isMouseDown = false;
      //   this.style.cursor = 'default'
      // }, false)
    }
    function template(size) {
      var div = doc.createElement('div')
      div.classList.add('modal')
      div.classList.add('modal-' + size)
      var html =  ` <div class="modal-dialog">
                      <a href="#" class="modal-close">x</a>
                      <div class="modal-header">모달1</div>
                      <div class="modal-content">모달 컨텐츠</div>
                      <button class="makeModal">모달</button>
                    </div>`
      div.innerHTML = html
      return div
    }
    Modal.prototype.destroy = function() {
      this.destroyOverlay()
      this.el.parentNode.removeChild(this.el)
    }
    Modal.prototype.createOverlay = function() {
      var parentNode = this.el.parentNode;
      var modals = parentNode.querySelectorAll('.modal')
      if(!parentNode.querySelector('.modal-overlay')) {
        var overlay = doc.createElement('div')
        overlay.classList.add('modal-overlay')
        overlay.style.zIndex = 10
        parentNode.appendChild(overlay)
      } else {
        var overlay = doc.querySelector('.modal-overlay')
        overlay.style.zIndex = modals.length * 10
        this.el.querySelector('.modal-dialog').style.zIndex = modals.length * 10 + 5
      }
    }
    Modal.prototype.destroyOverlay = function() {
      var parentNode = this.el.parentNode;
      var overlay = parentNode.querySelector('.modal-overlay')
      var modals = parentNode.querySelectorAll('.modal')
      if(modals && modals.length === 1) {
        overlay.parentNode.removeChild(overlay)
      } else {
        overlay.style.zIndex = (modals.length - 1) * 10
      }
    }
    doc.querySelector('.makeModal').addEventListener('click', function() {
      new Modal({
        "size": "small",
        "childModalCallback": function() {
          new Modal({
            "size": "normal",
            "childModalCallback": function() {
              new Modal({
                "size": "small",
                "childModalCallback": function() {
                  new Modal({
                  })
                }
              })
            }
          })
        }
      })
    }, false)
  })(window, document)
```