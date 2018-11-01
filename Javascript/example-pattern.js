(function (exports, document) {
  var isDebug = true // 배포시 false로 바꿔주세요
  var animate = {
    eventName: 'animationend',
    setEventName: function (eventName) {
      this.eventName = eventName
    },
    getEventName: function () {
      return this.eventName
    },
    supportAnimationEnds: function () {
      var div = document.createElement('div')
      var animationEndsEventNames = {
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'animationend',
        OAnimation: 'oAnimationEnd oanimationEnd',
        animation: 'animationend'
      }
      var result = false
      for (var name in animationEndsEventNames) {
        if (Object.prototype.hasOwnProperty.call(animationEndsEventNames, name)) {
          if (div.style[name] !== undefined) {
            this.setEventName(animationEndsEventNames[name])
            result = true
          }
        }
      }
      return result
    }
  }

// Polyfills
  if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function (callback) {
      for (var i = 0; i < this.length; i++) {
        callback.apply(this, [this[i], i, this])
      }
    }
  }

  function Sponsorbar(options) {
    this.section = document.getElementById(options.section) || document.getElementById('SponsorBarWrap')

    setTagStyle(this.section, {
      'max-width': '1100px',
      'width': '100%'
    })

    // sponsorbar 생성
    this.barBanner = {}
    this.isSport = false

    if (options.barBanner.barImg) {
      if (options.barBanner.barImg.length > 1) {
        this.barBanner.barImg = validateList(options.barBanner.barImg) || {}
      } else {
        this.barBanner.barImg = options.barBanner.barImg || ''
      }
      if (options.barBanner.objImg !== '') {
        this.barBanner.objImg = options.barBanner.objImg || ''
      }
      if (options.barBanner.changeSpeed) {
        this.barBanner.changeSpeed = options.barBanner.changeSpeed || 2
      }
    }
    if (options.miniSite && options.miniSite.img) {
      this.miniSite = {
        'img': options.miniSite.img || '',
        'linkUrl': options.miniSite.linkUrl || '',
        'altText': options.miniSite.altText || '광고',
        'expandAnimation': options.miniSite.animationType || '',
        'animationType': options.miniSite.animationType || '',
        'height': options.miniSite.height || 418,
        'adImgOver': options.miniSite.adImgOver || '',
        'expandSpeed': options.miniSite.expandSpeed || '',
        'responsive': options.miniSite.responsive || false
      }

      if (options.miniSite && options.miniSite.video) {
        this.miniSite.video = {
          'videoUrl': options.miniSite.video.videoUrl || '',
          'poster': options.miniSite.video.poster || '',
          'landingUrl': options.miniSite.video.landingUrl || '',
          'landingTarget': options.miniSite.video.landingTarget || '_blank',
          'width': options.miniSite.video.width || 586,
          'height': options.miniSite.video.height || 320,
          'theme': options.miniSite.video.theme || 'pc',
          'autoPlay': options.miniSite.video.autoPlay || false,
          'muted': options.miniSite.video.muted || false,
          'controls': options.miniSite.video.controls || false,
          'frameElementUrl': options.miniSite.video.frameElementUrl || '//t1.daumcdn.net/adfit/static/video-container.html'
        }
      }
    }
    if (!this.section.querySelector('.bar')) {
      this.setTemplate()
    }
    this.el = this.section.querySelector('.bar')
    this.isAnimation = animate.supportAnimationEnds()

    this.barBanner.linkUrl = options.barBanner.linkUrl || '#'
    this.barBanner.altText = options.barBanner.altText || '광고'
    this.barBanner.width = options.barBanner.width || 978

    this.renderBar()
  }

  Sponsorbar.prototype = {
    renderBar: function () {
      this.createBar()
      if (this.barBanner.objImg) {
        this.createObj()
      }
    },
    createBar: function () {
      var self = this
      var loadedImgList = []
      var barImg = document.createElement('img')
      var imgList = self.barBanner.barImg
      var loadCount = 0
      this.linkSection = document.createElement('a')
      setTagStyle(this.linkSection, {})
      this.linkSection.href = this.barBanner.linkUrl
      if (isLowIE()) {
        // Ie 8 이하 단컷 이미지 처리
        barImg.src = this.barBanner.barImg[0]
        barImg.setAttribute('alt', self.barBanner.altText)
        this.linkSection.setAttribute('target', '_blank')
        this.linkSection.appendChild(barImg)
      } else {
        // IE 8 이상 2컷 롤링 이미지
        this.linkSection.setAttribute('target', '_blank')
        self.barBanner.barImg.forEach(function (src, index) {
          var img = new Image()
          img.src = src
          img.setAttribute('alt', self.barBanner.altText)
          onEvent(img, 'load', function () {
            setTagStyle(img, {
              'position': 'absolute',
              'right': 0
            })
            if (img.width < 500) {
              setTagStyle(img, {
                'right': 0,
                'top': 0 + 'px'
              })
            } else {
              setTagStyle(img, {
                'opacity': 0,
                'left': 0,
                'margin-left': 'auto',
                'margin-right': 'auto'
              })
            }

            if (!index) {
              loadedImgList[self.barBanner.barImg.length - 1] = this
              this.setAttribute('data-index', self.barBanner.barImg.length - 1)
              setTagStyle(img, {
                'visibility': 'visible',
                'opacity': 1
              })
            } else {
              if (index === 1) {
                setTagStyle(img, {
                  'visibility': 'visible',
                  'opacity': 1
                })
              }
              this.setAttribute('data-index', index - 1)
              loadedImgList[index - 1] = this
            }
            loadCount++
            if (loadCount === imgList.length) {
              self.successLoadImg(loadedImgList, self.linkSection)
            }
          })
        })
      }
      this.el.appendChild(this.linkSection)
    },
    createObj: function () {
      var self = this
      this.obj = createElement('div', {
        'position': 'absolute',
        'right': 70 + 'px',
        'bottom': 0,
        'zIndex': 1000
      })
      var a = createElement('a', {
        'width': 'auto',
        'height': 'auto',
        'color': 'transparent'
      }, {
        'href': self.barBanner.linkUrl,
        'target': '_blank'
      })
      var objImg = createElement('img', {}, {
        'src': self.barBanner.objImg,
        'onerror': 'this.parentNode.remove()',
        'alt': self.barBanner.altText
      })
      this.obj.appendChild(a)
      a.appendChild(objImg)
      this.el.appendChild(this.obj)
    },
    successLoadImg: function (loadedImgList, linkSection) {
      var self = this
      var section = this.el
      loadedImgList.forEach(function (img) {
        linkSection.appendChild(img)
      })
      if (section.querySelector('img').width > 500) {
        self.isSport = false
      } else {
        self.isSport = true
      }
      if (this.miniSite) {
        this.tooltipTemp = this.createTooltip()
        this.tooltipCover = this.createTooltipCover()
        section.appendChild(this.tooltipTemp)
        if (self.isSport) {
          section.appendChild(this.tooltipCover)
        }
        this.el.appendChild(linkSection)
        this.infiniteAnimation()
        this.bindTooltipEvents()
      }
      if (loadedImgList.length > 1) {
        setTimeChangeImage(loadedImgList, self.barBanner.changeSpeed * 1000)
      }
    },

    createTooltip: function () { // tooltip 생성
      var self = this
      var tooltip = createElement('div', {
        'position': 'absolute',
        'top': 0,
        'right': self.isSport ? '-70px' : 0,
        'width': '70px',
        'height': '55px',
        'overflow': 'visible',
        'zIndex': 20
      }, {
        'class': 'tooltip-wrapper'
      })
      var text = createElement('div', {
        'position': 'absolute',
        'width': '70px',
        'height': '55px',
        'background': 'url("//t1.daumcdn.net/media/common/ad/sponsorbar/tooptip_default_2.png") no-repeat 0% center'
      }, {
        'class': 'tooltip-text'
      })
      var count = createElement('div', {
        'position': 'absolute',
        'width': '70px',
        'height': '55px',
        'background': 'url("//t1.daumcdn.net/media/common/ad/sponsorbar/tooltip_count.png") no-repeat left center',
        'display': 'none'
      }, {
        'class': 'tooltip-count'
      })
      tooltip.appendChild(text)
      tooltip.appendChild(count)
      return tooltip
    },
    createTooltipCover: function () {
      var cover = createElement('div', {
        'position': 'absolute',
        'top': 0,
        'right': 0,
        'width': '330px',
        'height': '55px',
        'zIndex': 1001
      }, {
        'class': 'tooltip-cover'
      })
      if (isLowIE()) {
        cover.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'
      } else {
        cover.style.backgroundColor = 'rgba(0, 0, 0, 0.001)'
      }
      return cover
    },
    infiniteAnimation: function () {
      if (this.isAnimation) {
        this.createStyle()
      }
    },

    bindTooltipEvents: function () {
      var self = this
      var tooltipCover = document.querySelector('.tooltip-cover')
      var tooltip = document.querySelector('.tooltip-wrapper')
      tooltip.addEventListener('mouseenter', function () {
        countingAnimation(self)
      })
      tooltip.addEventListener('mouseleave', function () {
        stopCountingAnimation()
      })
      if (self.isSport) {
        tooltipCover.addEventListener('mouseenter', function () {
          countingAnimation(self)
        })
        tooltipCover.addEventListener('mouseleave', function () {
          stopCountingAnimation()
        })
      }
      onEvent(this.linkSection, 'click', this.stopCountingAnimation)
    },
    createStyle: function () {
      var css = document.createElement('style')
      var head = document.querySelector('head')
      var style = '#SponsorBarWrap .bar { overflow: visible; position: relative; margin: 0 auto } .animateHeight { max-height: 0; opacity: 0 } ' +
        '.slideDown { max-height: 418px; transition-property: max-height;transition-duration: ' + this.miniSite.expandSpeed + 's;transition-timing-function: cubic-bezier(0, 1, 0.5, 1); opacity: 1}' +
        '.fadeIn { -webkit-transition: opacity ' + this.miniSite.expandSpeed + 's ease-in; -moz-transition: opacity ' + this.miniSite.expandSpeed +
        ' ease-in; -o-transition: opacity ' + this.miniSite.expandSpeed + 's ease-in; opacity: 1; max-height: 418px}'
      css.appendChild(document.createTextNode(style))
      head.appendChild(css)
    },
    setTemplate: function () {
      var self = this
      setTagStyle(this.section, {
        'display': 'block',
        'top': 0,
        'max-width': '1100px',
        'min-width': '978px',
        'min-height': '55px',
        'position': 'absolute',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'left': 0,
        'right': 0
      })
      if(document.querySelector('.head_view')){
        var width = document.querySelector('.inner_gnb').clientWidth
        setTagStyle(this.section, {
          'width': width + 'px'
        })
      }
      if (self.miniSite && self.miniSite.responsive) {
        setTagStyle(this.section, {
          'margin-left': (-self.section.clientWidth / 2) + 'px'
        })
      }
      var bar = createElement('div', {
        'height': '100%',
        'width': '100%',
        'display': 'block',
        'position': 'relative',
        'margin': '0 auto',
        'overflow': 'visible'
      })
      bar.setAttribute('class', 'bar')
      this.section.appendChild(bar)
    },
    showModal: function () {
      var self = this
      new Image().src = this.miniSite.adImgOver
      this.modalWrap = createElement('div', {
        'position': 'absolute',
        'top': self.isSport ? 55 + 'px' : 0,
        'left': 0,
        'right': 0,
        'margin-left': 'auto',
        'margin-right': 'auto',
        'height': self.miniSite.height + 'px',
        'overflow': 'hidden',
        'zIndex': 1002
      }, {
        'id': 'modalWrap',
        'class': 'animateHeight'
      })
      this.imageWrap = createElement('div', {
        'position': 'absolute',
        'height': self.miniSite.height + 'px',
        'width': '100%',
        'top': 0 + 'px'
      })
      var modalLink = createElement('a', {
        'display': 'block',
        'width': '100%',
        'height': '100%',
        'position': 'relative',
        'bottom': '0'
      }, {
        'href': self.miniSite.linkUrl,
        'target': '_blank'
      })
      this.modalImage = new Image()
      this.modalImage.src = this.miniSite.img
      this.modalImage.setAttribute('alt', this.altText)
      if (isLowIE()) {
        this.createModalContent(modalLink)
      } else {
        onEvent(this.modalImage, 'load', function () {
          self.createModalContent(modalLink)
        })
      }
    },

    createModalContent: function (modalLink) {
      var self = this
      this.tooltipTemp.style.display = 'none'
      setTagStyle(this.modalImage, {
        'position': 'absolute',
        'height': '418px',
        'top': 0 + 'px'
      })
      if (this.barBanner && this.barBanner.objImg) {
        setTagStyle(this.obj, {
          'display': 'none'
        })
      }
      this.closeBtn = createElement('div', {
        'position': 'absolute',
        'display': 'block',
        'right': 0,
        'top': 0,
        'width': '73px',
        'height': '73px',
        'zIndex': '200',
        'cursor': 'pointer',
        'background': 'url("//t1.daumcdn.net/media/common/ad/sponsorbar/closebt_170821.png") center no-repeat'
      })
      modalLink.appendChild(this.modalImage)
      this.imageWrap.appendChild(modalLink)
      this.imageWrap.appendChild(this.closeBtn)
      this.modalWrap.appendChild(this.imageWrap)
      this.el.appendChild(this.modalWrap)
      this.isModalShow = true
      setTimeout(function () {
        self.modalWrap.className += ' slideDown ' + self.miniSite.animationType
      }, 20)
      if (this.miniSite.video && this.miniSite.video.videoUrl) {
        this.createVideo()
      }
      this.modalBindEvents()
    },
    modalBindEvents: function () {
      var self = this
      onEvent(self.closeBtn, 'click', function (e) {
        if (e.preventDefault) {
          e.preventDefault()
        }
        self.closeModal()
      })
      if (this.miniSite && this.miniSite.responsive) {
        this.watchResize()
      }
    },
    watchResize: function () {
      var self = this
      exports.addEventListener('resize', self.resizeWindow, true)
    },
    resizeWindow: function () {
      this.modalWrap.style.width = this.el.clientWidth
    },
    closeModal: function () {
      var self = this
      this.tooltipTemp.style.display = 'block'
      this.tooltipTemp.querySelector('.tooltip-text').style.display = 'block'
      var video = document.getElementById('videoArea')
      removeElement(video)
      exports.removeEventListener('resize', self.resizeWindow, true)
      removeElement(self.modalWrap)
      if (this.barBanner && this.barBanner.objImg) {
        setTagStyle(this.obj, {
          display: 'block'
        })
      }
      this.isModalShow = false
    },
    createVideo: function () {
      var self = this
      var videoArea = createElement('iframe', {
        'width': self.miniSite.video.width + 'px',
        'height': self.miniSite.video.height + 'px',
        'background': 'black',
        'zIndex': 400,
        'border': 0,
        'position': 'absolute',
        'overflow': 'hidden',
        'top': ((self.miniSite.height - 330) / 2) + 'px',
        'left': 20 + 'px'
      }, {
        id: 'videoArea',
        'data-ad-play-src': self.miniSite.video.videoUrl,
        'data-ad-width': self.miniSite.video.width,
        'data-ad-height': self.miniSite.video.height,
        'data-ad-theme': self.miniSite.video.theme,
        'data-ad-autoplay': self.miniSite.video.autoPlay,
        'data-ad-controls': self.miniSite.video.controls,
        'data-ad-play-mute': self.miniSite.video.muted,
        'data-ad-landing-url': self.miniSite.video.landingUrl,
        'data-ad-landing-target': self.miniSite.video.landingTarget,
        'data-ad-poster-src': self.miniSite.video.poster
      })
      self.modalWrap.appendChild(videoArea)
      this.setVideoScript()
    },
    setVideoScript: function () {
      var self = this
      function setDatasetName(name) {
        var result = [];
        var namepieces = name.split('-');
        for(var i = 1; i < namepieces.length; i++) {
          result[i-1] = i === 1 ?  namepieces[i] : namepieces[i].charAt(0).toUpperCase() + namepieces[i].slice(1);
        }
        return result.join('');
      }

      var frameElement = document.getElementById('videoArea');
      var urlParams = [], playtimeParams = [];
      var dataset = frameElement.attributes;
      for(var i = 0; i < dataset.length; i++) {
        if(dataset[i].name.indexOf('data-ad') !== -1){
          var camelCaseDataset = setDatasetName(dataset[i].name)
          if(camelCaseDataset.indexOf('adPlaytime') !== -1) {
            playtimeParams.push(camelCaseDataset + '=' + encodeURIComponent(dataset[i].value));
          } else {
            urlParams.push(camelCaseDataset + '=' + encodeURIComponent(dataset[i].value));
          }
        }
      }
      frameElement.src = [self.miniSite.video.frameElementUrl, urlParams.join('&')].join('?');
      frameElement.addEventListener('load', function onLoad() {
        this.removeEventListener('load', onLoad, false);
        this.contentWindow.postMessage({'event': 'adPlaytimeList', 'params': playtimeParams.join('&')}, '*');
      }, false)
    }
  }


  function stopCountingAnimation() { // 3-2-1 애니메이션 중지
    var countEl = document.querySelector('.tooltip-count')
    var textEl = document.querySelector('.tooltip-text')
    countEl.style.display = 'none'
    textEl.style.display = 'block'
    countEl.style.backgroundPosition = '0%'
    clearInterval(this.countInterval)
  }

  function countingAnimation(self) {
    var count = 0
    var countEl = document.querySelector('.tooltip-count')
    var isModalShow = self.isModalShow
    var textEl = document.querySelector('.tooltip-text')
    countEl.style.display = 'block'
    textEl.style.display = 'none'
    this.countInterval = setInterval(function () {
      countEl.style.backgroundPosition = count + 'px'
      if (count < -2095) {
        if (!isModalShow) {
          self.showModal()
          clearInterval(this.countInterval)
          self.isModalShow = true
        }
      } else {
        count -= 70
      }
    }, 25)
  }
  // Bar 영역 이미지 롤링 시작
  function setTimeChangeImage(imgList, duration) {
    setTimeout(function () {
      autoChangeImage(imgList, duration)
    }, duration)
  }

  function autoChangeImage(imgList, duration) {
    var currentImg
    var nextImg
    var isIE = (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) ? true : false
    var time = isIE ? 0.01 : 0.003
    for (var i = 0; i < imgList.length; i++) {
      if (imgList[i].style.visibility === 'visible') {
        currentImg = imgList[i]
        nextImg = imgList[i + 1] ? imgList[i + 1] : imgList[0]
      }
    }
    var currentOpacity = 1
    var nextOpacity = 0
    nextImg.style.visibility = 'visible'

    autoChanging()

    function autoChanging() {
      var opacityTimer = setInterval(function () {
        if (currentOpacity < 0) {
          clearInterval(opacityTimer)
          opacityTimer = null
          currentImg.style.visibility = 'hidden'
          nextImg.style.visibility = 'visible'
          if (nextImg.clientWidth > 500) {
            if (nextImg !== imgList[imgList.length - 2]) {
              setTimeChangeImage(imgList, duration)
            }
          } else {
            setTimeChangeImage(imgList, duration)
          }
        }
        currentImg.style.opacity = currentOpacity
        currentOpacity -= time
        nextImg.style.opacity = nextOpacity
        nextOpacity += time
      }, 1)
    }
  }

  function validateList(list) {
    var newList = []
    list.forEach(function (data) {
      if (data) {
        newList.push(data)
      }
    })
    return newList
  }

  function removeElement(element) {
    return element && element.parentNode && element.parentNode.removeChild(element)
  }

  function isLowIE() {
    return window.addEventListener ? false : true
  }

  function onEvent(el, event, callback) {
    if (window.addEventListener) {
      el.addEventListener(event, callback, false)
    } else {
      el.attachEvent('on' + event, callback)
    }
    return false
  }

  function setTagStyle(el, css) {
    for (var key in css) {
      if (Object.prototype.hasOwnProperty.call(css, key)) {
        el.style[key] = css[key]
      }
    }
  }

  function createElement(tag, css, attrs) {
    var el = document.createElement(tag)
    if (attrs) {
      setAttr(el, attrs)
    }
    if (css) {
      setTagStyle(el, css)
    }
    return el
  }

  function setAttr(el, attrs) {
    for (var attr in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, attr)) {
        el.setAttribute(attr, attrs[attr])
      }
    }
  }

  function logs(log) {
    if (isDebug) {
      if (typeof console === 'object') {
        var fName = logs.caller && (logs.caller.name || 'global')
        if (log instanceof Object) {
          console.log('[' + fName + ']')
          console.log(log)
        } else {
          console.log('[' + fName + ']' + log)
        }
      }
    }
  }
  exports.Sponsorbar = Sponsorbar
})(window, document)