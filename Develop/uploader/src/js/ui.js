import renderer from './lib/renderer'

const thumbnail = (frameId, imageSrc) => {
  return renderer.create(`
    <li class="select" data-img-id="${frameId}">
          <img src=${imageSrc} />
    </li>`)
}

const history = renderer.create(`
  <div class="contain_tools">
    <button type="button" id="btnOrigin" class="btn_mainly" disabled>
        <span class="ico_comm ico_origin">원래대로</span>
    </button>
    <button type="button" id="btnUndo" class="btn_mainly" value="Undo" disabled>
        <span class="ico_comm ico_undo">이전</span>
    </button>
    <button type="button" id="btnRedo" class="btn_mainly" value="Redo" disabled>
        <span class="ico_comm ico_redo">다음</span>
    </button>
    <span class="bar"></span>
  </div>`
)

const tools = renderer.create(`
  <div class="contain_tools">
    <button type="button" id="btnSize" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_size"></span>
            <span class="txt">크기</span>
        </div>
    </button>
    <button type="button" id="btnRotate" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_rotate"></span>
            <span class="txt">회전</span>
        </div>
    </button>
    <button type="button" id="btnCrop" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_cut"></span>
            <span class="txt">자르기</span>
        </div>
    </button>

    <span class="bar"></span>

    <button type="button" id="btnEffect" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_effect"></span>
            <span class="txt">효과</spa>
        </span>
    </button>
    <button type="button" id="btnFrame" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_frame"></span>
            <span class="txt">액자</span>
        </div>
    </button>

    <span class="bar"></span>

    <button type="button" id="btnDraw" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_draw"></span>
            <span class="txt">그리기</span>
        </div>
    </button>
    <button type="button" id="btnSticker" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_sticker"></span>
            <span class="txt">스티커</span>
        </div>
    </button>
    <!--  FIXME: 추후 추가
    <button type="button" id="btnBubble" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_blah"></span>
            <span class="txt">말풍선</span>
        </div>
    </button>
    -->
    <button type="button" id="btnText" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_txt"></span>
            <span class="txt">텍스트</span>
        </div>
    </button>

    <span class="bar"></span>

    <!--  FIXME: 추후 추가
    <button type="button" id="btnSign" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_sign"></span>
            <span class="txt">서명</span>
        </div>
    </button>
    -->
    <button type="button" id="btnEXIF" disabled>
        <div class="inner_btn">
            <span class="ico_comm ico_exif"></span>
            <span class="txt">EXIF</span>
        </div>
    </button>
  </div>`
)

const layerResize = () => {
  return renderer.create(`
  <div class="inner_contents">
      <div class="item">
          <div class="sec_radio">
              <input type="radio" id="originSize" name="size" class="inp_radio">
          </div>
          <label for="originSize" class="sec_selec">
              <select class="selector">
                  <option value="" class="select_origin">원본</option>
                  <option value="320">320</option>
                  <option value="400">400</option>
                  <option value="580">580</option>
                  <option value="640">640</option>
                  <option value="700">700</option>
                  <option value="1024">1024</option>
              </select>
          </label>
      </div>
      <div class="item">
          <div class="sec_radio">
              <input type="radio" id="customSize" name="size" class="inp_radio">
          </div>
          <label for="customSize" class="sec_inp">
              <div class="box">
                  <input type="text" id="sizeWidth">
                  <span>width</span>
              </div>
              <a href="#none" class="link_lock"><span class="ico_comm"></span></a>
              <div class="box">
                  <input type="text" id="sizeHeight">
                  <span>height</span>
              </div>
          </label>
      </div>
      <!--  FIXME: 추후 추가
      <div class="item_all">
          <input type="checkbox" id="inpCheck" class="inp_check">
          <label class="lab_check" for="inpCheck"><span class="ico_comm"></span>모든사진적용하기</label>
      </div>
      -->
  </div>
  `)
}

const layerRotate = () => {
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <button type="button" class="btn_rotate" id="rotateLeftBtn">
                <span class="ico_comm ico_left"></span> 좌측회전
            </button>
            <button type="button" class="btn_rotate" id="rotateRightBtn">
                <span class="ico_comm ico_right"></span> 우측회전
            </button>
            <button type="button" class="btn_rotate" id="scaleLeftRightBtn">
                <span class="ico_comm ico_width_reverse"></span> 좌우반전
            </button>
            <button type="button" class="btn_rotate" id="scaleTopBottomBtn">
                <span class="ico_comm ico_height_reverse"></span> 상하반전
            </button>
        </div>
        <!--   FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck2" class="inp_check">
            <label class="lab_check" for="inpCheck2"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
    `)
}

const layerFilter = () => {
  return renderer.create(`
    <div class="inner_contents layer_filter">
        <div class="item" id="filter-brightness">
            <span class="sub_tit">밝기</span>
            <input id="chg-bright" type="range" class="inp_range" min="-100" max="100" step="1" value="0">
            <span class="detail_check">
                <button type="button" class="btn btn_left"><span class="ico_comm ico_left"></span></button>
                <span class="num">0</span>
                <button type="button" class="btn btn_right"><span class="ico_comm ico_right"></span></button>
            </span>
        </div>
        <div class="item" id="filter-contrast">
            <span class="sub_tit">대비</span>
            <input id="chg-ctrs" type="range" class="inp_range" min="-100" max="100" step="1" value="0">
            <span class="detail_check">
                <button type="button" class="btn btn_left"><span class="ico_comm ico_left"></span></button>
                <span class="num">0</span>
                <button type="button" class="btn btn_right"><span class="ico_comm ico_right"></span></button>
            </span>
        </div>
        <!-- FIXME: 추후 추가
        <div class="item">
            <span class="sub_tit">채도</span>
            <input id="chg-sat" type="range" class="inp_range" min="-100" max="100" step="1" value="0">
            <span class="detail_check">
                <button type="button" class="btn btn_left"><span class="ico_comm ico_left"></span></button>
                <span class="num">0</span>
                <button type="button" class="btn btn_right"><span class="ico_comm ico_right"></span></button>
            </span>
        </div>
        <div class="item">
            <span class="sub_tit">색상</span>
            <input id="chg-colior" type="range" class="inp_range" min="-100" max="100" step="1" value="0">
            <span class="detail_check">
                <button type="button" class="btn btn_left"><span class="ico_comm ico_left"></span></button>
                <span class="num">0</span>
                <button type="button" class="btn btn_right"><span class="ico_comm ico_right"></span></button>
            </span>
        </div>
        -->

        <!--  FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck3" class="inp_check">
            <label class="lab_check" for="inpCheck3"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
  `)
}

const layerFrame = () => {
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <ul class="list_frame">
            </ul>
            <div class="contain_btn">
                <div class="inner_contain">
                    <a href="#none" class="btn_prev"><span class="ico_comm"></span></a>
                    <a href="#none" class="btn_next"><span class="ico_comm"></span></a>
                </div>
            </div>
        </div>

        <!--  FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck3" class="inp_check">
            <label class="lab_check" for="inpCheck3"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
  `)
}

const itemList = (imgSrc, title) => {
  return renderer.create(`
    <li class="ls"><a href="#"><img src=${imgSrc} alt="${title}"/></a></li>
  `)
}

const layerDraw = () => {
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <div id="drawing-color">
                <input type="color" id="color-picker"/>
            </div>
            <div id="drawing-size">
                <span>크기 </span><input type="range" id="brushSize" min="1" max="40" value="10"/><span class="value">10</span>
            </div>
                <div id="drawing-transparent">
                  <span>투명 </span><input type="range" id="brushTransparent" min="0" max="100" step="10" value="100"/><span class="value">100</span>%</br>
                </div>
            </div>
        </div>
    </div>
  `)
}

const layerSticker = () => {
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <ul class="list_frame"> </ul>
            <div class="contain_btn">
                <div class="inner_contain">
                    <a href="#none" class="btn_prev"><span class="ico_comm"></span></a>
                    <a href="#none" class="btn_next"><span class="ico_comm"></span></a>
                </div>
            </div>
        </div>

        <!--  FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck3" class="inp_check">
            <label class="lab_check" for="inpCheck3"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
  `)
}

const stickerItemList = imgSrc => {
  return renderer.create(`
    <li><a href="#none"><img src="${imgSrc}" /></a></li>
    `)
}

const layerBubble = () => {
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <ul class="list_frame">
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
                <li><a href="#none"><img src="images/example.jpeg" /></a></li>
            </ul>
            <div class="contain_btn">
                <div class="inner_contain">
                    <a href="#none" class="btn_prev"><span class="ico_comm"></span></a>
                    <a href="#none" class="btn_next"><span class="ico_comm"></span></a>
                </div>
            </div>
        </div>
        <div class="item">
            <select class="selector select_type01">
                <option>Arial</option>
                <option>Verdana</option>
                <option>Times New Roman</option>
                <option>Courier New</option>
                <option>serif</option>
                <option>sans-serif</option>
            </select>
            <select class="selector select_type02">
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
            </select>
            <div style="float:left;margin-left:5px;width:20px;height:20px;border:1px solid red"></div>
        </div>
        <div class="item">
            <span class="sub_tit">배경</span>
            <div style="float:left;margin-right:5px;width:20px;height:20px;border:1px solid red"></div>
            <input id="chg-bubble-bg-ctrs" type="range" class="inp_range" min="-100" max="100" step="1" value="0" style="width:115px">
            <span class="detail_check">
                <span class="num">0</span>
            </span>
        </div>
        <div class="item">
            <span class="sub_tit">선</span>
            <div style="float:left;margin-right:5px;width:20px;height:20px;border:1px solid red"></div>
            <input id="chg-ctrs" type="range" class="inp_range" min="-100" max="100" step="1" value="0" style="width:115px">
            <span class="detail_check">
                <span class="num">0</span>
            </span>
        </div>
        
        <!--  FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck3" class="inp_check">
            <label class="lab_check" for="inpCheck3"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
  `)
}
const fontFamiles = [
  'Arial',
  'Verdana',
  'Times New Roman',
  'Courier New',
  'serif',
  'sans-serif',
]
const fontSizes = [10, 12, 14, 16, 20, 24, 28, 30, 40]
const layerText = () => {
  const fontsDom = fontFamiles.map(
      el => `<option ${el == 'Arial' ? 'selected' : ''}>${el}</option>`
    ),
    sizesDom = fontSizes.map(
      el => `<option ${el == 30 ? 'selected' : ''}>${el}</option>`
    )
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <select class="selector select_type01">
                ${fontsDom}
            </select>
            <select class="selector select_type02">
                ${sizesDom}
            </select>
             <div id="drawing-color">
                <input type="color" id="color-picker" value="#fff"/>
            </div>
            <!--<div class="item">
              <span class="sub_tit">배경</span>
              <div style="float:left;margin-right:5px;width:20px;height:20px;border:1px solid red"></div>
              <input id="chg-text-bg-ctrs" type="range" class="inp_range" min="-100" max="100" step="1" value="0" style="width:115px">
              <span class="detail_check">
                  <span class="num">0</span>
              </span>
        </div>-->
        </div>
    </div>
  `)
  /*

   */
}

const layerSign = () => {
  return renderer.create(`
    <div class="inner_contents">
        <div class="item">
            <select class="selector">
                <option>텍스트서명</option>
                <option>이미지서명</option>
                <option>서명 사용안함</option>
            </select>
        </div>

        <span class="bar"></span>

        <!-- 텍스트서명 -->
        <div class="txt_sign">
            <div class="item">
                <select class="selector select_type01">
                    <option>돋움</option>
                    <option>돋움</option>
                    <option>돋움</option>
                </select>
                <select class="selector select_type02">
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                </select>
                <div style="float:left;margin-left:5px;width:20px;height:20px;border:1px solid red"></div>
            </div>
            <div class="item">
                <span class="sub_tit">배경</span>
                <div style="float:left;margin-right:5px;width:20px;height:20px;border:1px solid red"></div>
                <input id="chg-ctrs" type="range" class="inp_range" min="-100" max="100" step="1" value="0" style="width:115px">
                <span class="detail_check">
                    <span class="num">0</span>
                </span>
            </div>
        </div>

        <!-- 이미지서명 -->
        <div class="img_sign">
            <input type="file">
            <span class="info">이미지용량 <em>100k</em>이하만 가능</span>
        </div>

        <div class="item">
            <button type="button" class="btn_sign">나의 서명으로 등록</button>
            <button type="button" class="btn_sign">불러오기</button>
        </div>

        <!--  FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck3" class="inp_check">
            <label class="lab_check" for="inpCheck3"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
  `)
}

const layerEXIF = () => {
  return renderer.create(`
    <div class="inner_contents layer_exif">
        <div class="item">
            <div >
                <em class="tit_select">공개여부</em>
                <div class="box">
                    <label>
                        <input type="radio" name="public" value="public" class="inp_radio" checked>공개
                    </label>
                    <label>
                        <input type="radio" name="public" value="private" class="inp_radio">비공개
                    </label>
                </div>
                <span class="bar"></span>
                <div class="box check_box">
                    <label>
                        <input type="checkbox" class="DateTime" checked> 촬영날짜
                    </label>
                    <label>
                        <input type="checkbox" class="ISOSpeedRatings" checked> IOS감도
                    </label>
                    <label>
                        <input type="checkbox" class="Model" checked> 카메라
                    </label>
                    <label>
                        <input type="checkbox" class="Software" checked> 프로그램
                    </label>
                    <label>
                        <input type="checkbox" class="ExposureTime" checked> 노출시간
                    </label>
                    <label>
                        <input type="checkbox" class="ApertureValue" checked> 조리개값
                    </label>
                    <label>
                        <input type="checkbox" class="ExposureBias" checked> 노출보정
                    </label>
                    <label>
                        <input type="checkbox" class="FocalLength" checked> 초점길이
                    </label>
                </div>
                <span class="bar"></span>
            </div>
        </div>

        <!--  FIXME: 추후 추가
        <div class="item_all">
            <input type="checkbox" id="inpCheck3" class="inp_check">
            <label class="lab_check" for="inpCheck3"><span class="ico_comm"></span>모든사진적용하기</label>
        </div>
        -->
    </div>
  `)
}

const layerCrop = () => {
  return renderer.create(`
    <div class="inner_contents">
      <div class="item">
        <p>크기</p>
        <span class="croppedWidth"></span> x <span class="croppedHeight"></span>
      </div>
    </div>
    `)
}

const ui = {
  thumbnail,
  history,
  tools,
  itemList,
  stickerItemList,
  layerResize,
  layerRotate,
  layerFilter,
  layerFrame,
  layerDraw,
  layerSticker,
  layerBubble,
  layerText,
  layerSign,
  layerEXIF,
  layerCrop,
}
export default ui
