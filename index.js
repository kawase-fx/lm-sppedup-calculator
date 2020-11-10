class Logger { static INF( m ) { qs( '#log' ).textContent += `${ m }\n`; qs( '#log' ).scrollTop = qs( '#log' ).scrollHeight; } }

class MaquetteUtil {
  static init( g ) {
    g.h = maquette.h;
    g.createProjector = () => maquette.createProjector();
    g.qs = ( s ) => document.querySelector( s );
    g.qsa = ( s ) => document.querySelectorAll( s );
    [
      'TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'HEADER',
      'IMG', 'INPUT', 'TEXTAREA', 'DIV', 'P', 'SPAN', 'LABEL', 'PRE', 'I', 'B', 'STYLE', 'A', 'BR',
      'BUTTON', 'SELECT', 'OPTION', 'DATALIST', 'SCRIPT', 'LINK', 'UL', 'LI', 'IFRAME', 'PROGRESS'
    ].map( elementName => {
      let tag = elementName.toLowerCase(), evol = `g.${ elementName } = ( attributes, content ) => { return h( '${ tag }', attributes, [ content ] ); }`;
      eval( evol );
    } );
  }
}
MaquetteUtil.init( globalThis );

let SCALE = localStorage.getItem( 'scale' ) || 1,
  MULTI = ( localStorage.getItem( 'multi' ) || false ) === "true",
  THRESHOLD = 120,
  LANG = localStorage.getItem( 'lang' ) || 'jpn';
const _d = document, MI = 60, HR = MI * 60, DY = HR * 24;
const GALLERY = qs( '#gallery' );

const RECT_TABLE = () => {
  return {
    eng: [
      [ 0.1875, 0.2785, 0.2604, 0.037, 1, 0 ], [ 0.098, 0.398, 0.0938, 0.037, 1, 1 ],
      [ 0.1875, 0.4785, 0.2604, 0.037, 2, 0 ], [ 0.098, 0.598, 0.0938, 0.037, 2, 1 ],
      [ 0.1875, 0.6785, 0.2604, 0.037, 3, 0 ], [ 0.098, 0.798, 0.0938, 0.037, 3, 1 ]
    ],
    jpn: [
      [ 0.1875, 0.2704, 0.2604, 0.037, 1, 0 ], [ 0.1, 0.3926, 0.0938, 0.037, 1, 1 ],
      [ 0.1875, 0.4685, 0.2604, 0.037, 2, 0 ], [ 0.1, 0.5926, 0.0938, 0.037, 2, 1 ],
      [ 0.1875, 0.6685, 0.2604, 0.037, 3, 0 ], [ 0.1, 0.7926, 0.0938, 0.037, 3, 1 ]
    ],
    chi_tra: [
      [ 0.1875, 0.2745, 0.2604, 0.037, 1, 0 ], [ 0.1, 0.3926, 0.0938, 0.037, 1, 1 ],
      [ 0.1875, 0.4745, 0.2604, 0.037, 2, 0 ], [ 0.1, 0.5926, 0.0938, 0.037, 2, 1 ],
      [ 0.1875, 0.6745, 0.2604, 0.037, 3, 0 ], [ 0.1, 0.7926, 0.0938, 0.037, 3, 1 ]
    ]
  }[ LANG ];
};

const CVT = {};
const defaultCVT = {
  ' ': '', '\n': '', '。': '', '_': '', 'い': '', ':': '', '﹕': '',
  '錦': '錬', '致': '数', '攻': '数', '呑': '間',  '問': '間', '閾': '間', 'ピードピード': 'ピード',
  '童': '速', '鏵': '鐘', '竦': '速', '逃': '速', '途': '速', '建': '速', '禰': '發',
  '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9', '⑩': '10',
  '⑪': '11', '⑫': '12', '⑬': '13', '⑭': '14', '⑮': '15', '⑯': '16', '⑰': '17', '⑱': '18', '⑲': '19', '⑳': '20',
  'Have': '', 'Repair': '', 'Iraining': 'Training',
  '曰': '日', '切': '分', '刎': '分', '呂': '間', '訊': '訓', '刈': '分',
  '所持数': '', '.': '', '，': '', ',': '', '治治': '治', '修復': '', '醫院': '', '已擁有': ''
};
if( !localStorage.getItem( 'CVT' ) ) {
  Object.assign( CVT, defaultCVT );
  localStorage.setItem( 'CVT', JSON.stringify( CVT ) );
} else {
  Object.assign( CVT, defaultCVT );
  Object.assign( CVT, JSON.parse( localStorage.getItem( 'CVT' ) ) );
}

LANGS = { eng: 'eng', jpn: 'jpn', chi_tra: 'chi_tra' };
R = {
  caption: { eng: 'Lords mobile speed up OCR', jpn: 'ローモバ時短計算機' , chi_tra: '王國紀元加速OCR' },
  instructions: { eng: '[github]', jpn: '【説明】' , chi_tra: '[github]' },
  prepare: { eng: 'PREPARING...', jpn: '準備中', chi_tra: '現在準備' },
  recognizing: { eng: 'RECOGNIZING...', jpn:  '認識中', chi_tra: '現在讀收' },
  spdup: { eng: 'SpeedUp', jpn: 'スピードアップ', chi_tra: '加速' },
  general: { eng: 'General', jpn: '汎用', chi_tra: '一般' },
  research: { eng: 'Research', jpn: '研究', chi_tra: '研發' },
  wall: { eng: 'Wall', jpn: '城壁', chi_tra: '城牆' },
  repair: { eng: 'Repair', jpn: '修復', chi_tra: '修復' },
  heal: { eng: 'Healing', jpn: '治療', chi_tra: '治療' },
  train: { eng: 'Training', jpn: '訓練', chi_tra: '訓練' },
  merge: { eng: 'Merging', jpn: '精製', chi_tra: '融合' },
  craft: { eng: 'Crafting', jpn: '錬成', chi_tra: '加工' },
  m: { eng: 'm', jpn: '分', chi_tra: '分鐘' },
  h: { eng: 'h', jpn: '時間', chi_tra: '小時' },
  d: { eng: 'days', jpn: '日', chi_tra: '天' },
  pct: { eng: '%', jpn: '%', chi_tra: '%' },
  boots: { eng: 'Boots', jpn: 'ブーツ', chi_tra: '飛馬靴' },
  confirmDelete: { eng: 'sure?', jpn: '削除していいですか？', chi_tra: '可以刪除它嗎？' },
  edit: { eng: 'EDIT', jpn: '編集', chi_tra: '編輯' },
  choiceWordFromTableHeader: { eng: 'choose from header to replace it.', jpn: '置き換える文字を表見出しから選んでください。', chi_tra: '從表頭中選擇要替換的字符' },
  savedConvertSetting: { eng: 'saved.', jpn: '識字設定を保存しました。', chi_tra: '已保存' },
  tableHome: { eng: '*', jpn: '種類/単位', chi_tra: '*' },
  total: { eng: 'TOTAL', jpn: '合計', chi_tra: '合計' },
  processTime: {eng: 'elapsed', jpn: '処理時間', chi_tra: '處理時間' },
  language: { eng: 'LANGUAGE', jpn: '言語', chi_tra: '語言' },
  scalingRate: { eng: 'SCALE', jpn: '拡大倍率', chi_tra: '放大率' },
  multiWork: { eng: 'MULTI', jpn: '並行処理', chi_tra: '並發處理' },
  readied: { eng: 'READIED.', jpn: '画像を選ぶか直接入力してください。', chi_tra: '選擇圖片或直接輸入' },
  recognitionDone: { eng: 'DONE.', jpn: '読み取り処理を終了しました。', chi_tra: '已完成' },
  itemCount: { eng: 'Item count', jpn: '個数', chi_tra: '数量' },
  saveCount: { eng: 'Save', jpn: '設定', chi_tra: '設置' },
  cancelEdit: { eng: 'Cancel', jpn: '戻る', chi_tra: '回去' },
  deleteCount: { eng: 'Delete', jpn: '削除', chi_tra: '删减' },
};
const RL = k => {
  if( R[ k ] ) return R[ k ][ LANG ];
  console.log( k );
};
const GENRES = () => { return [ RL( 'general' ), RL( 'research' ), RL( 'wall' ), RL( 'heal' ), RL( 'train' ), RL( 'merge' ), RL( 'craft' ) ] };
UNITS = [ '1m', '3m', '5m', '10m', '15m', '30m', '60m', '3h', '8h', '15h', '24h', '3d', '7d', '30d' ];
TOSEC = [ MI, MI * 3, MI * 5, MI * 10, MI * 15, MI * 30, HR, HR * 3, HR * 8, HR * 15, DY, DY * 3, DY * 7, DY * 30 ];

const msgByLang = ( m ) => {
  return {
    'loading tesseract core': RL( 'prepare' ),
    'initializing tesseract': RL( 'prepare' ),
    'initialized tesseract': RL( 'prepare' ),
    'loading language traineddata': RL( 'prepare' ),
    'loading language traineddata (from cache)': RL( 'prepare' ),
    'loaded language traineddata': RL( 'prepare' ),
    'initializing api': RL( 'prepare' ),
    'initialized api': RL( 'prepare' ),
    'recognizing text': RL( 'recognizing' ),
  }[ m ];
};

WHITELIST = () => {
  return '0123456789' +
    RL( 'spdup' ) +
    RL( 'm' ) + RL( 'h' ) + RL( 'd' ) +
    GENRES().reduce( ( a, b ) => `${ a }${ b }` ) + RL( 'repair' );
}

globalThis.T = {}, globalThis.F = {}, globalThis.S = {};
globalThis.recogLog = [];
globalThis.progressValue = 0;
globalThis.stat = RL( 'readied' );

const log2cvt = e => {
  ta = e.target;
  globalThis.amendKey = ta.value.slice( ta.selectionStart, ta.selectionEnd );
  if( amendKey ) Logger.INF( `${ RL( 'edit' ) } ${ amendKey } ${ RL( 'choiceWordFromTableHeader' ) }` );
}

const sleep = msec => new Promise( resolve => setTimeout( resolve, msec ) );

const zp = ( f, r, c ) => `${ f }`.padStart( c ? c : 2, 0 ) + r;

const s2dhms = ( s, ms ) => {
  let m = Number( !ms ? `${ s }` : `${ Math.floor( s / 1000 ) }` ), r = {};
  r.d = Math.floor( s / DY ); m -= r.d * DY;
  r.h = Math.floor( m / HR ); m -= r.h * HR;
  r.m = Math.floor( m / MI ); m -= r.m * MI;
  r.s = m;
  r.ja = zp( r.d, 'd' ); r.ja += zp( r.h, 'h' ); r.ja += zp( r.m, 'm' );

  r.jb = zp( r.m, 'm' ); r.jb += zp( r.s, 's' );
  if( ms ) r.jb += zp( s - m * 1000, 'ms' );
  return r;
}

const loadImage = i => { return new Promise( ( resolve, reject ) => {
  const r = new FileReader();
  r.onload = () => {
    const i = new Image();
    i.onload = () => resolve( i );
    i.onerror = e => reject( e );
    i.src = r.result;
  }
  r.onerror = e => reject( e );
  r.readAsDataURL( i );
} ); }

const jnl = m => {
  let pct = Big( m.progress ).mul( 100 ).toFixed( 2 );
  globalThis.stat = `${ LANG !== LANGS.eng ? msgByLang( m.status ) : m.status }`;
  globalThis.progressValue = Number( pct );
  cProj.renderNow();
}

const calc = () => {
  Object.keys( S ).filter( e => !GENRES().find( f => f === e ) ).map( x => { delete S[ x ] } );

  Object.keys( S ).map( k => {
    let st, kt = Object.keys( S[ k ] ).filter( e => e !== RL( 'total' ) );
    if( kt.length > 0 ) {
      st = kt.map( e => S[ k ][ e ].sec ).reduce( ( acc, cur ) => acc + cur );
      S[ k ][ RL( 'total' ) ] = { nums: 0, sec: st };
    } else {
      delete S[ k ];
    }
  } );

  if( S[ RL( 'general' ) ] ) {
    [ RL( 'research' ), RL( 'wall' ), RL( 'heal' ), RL( 'train' ) ].map( k => {
      if( S[ k ] ) {
        let st = S[ k ][ RL( 'total' ) ];
        st.nums = s2dhms( st.sec + S[ RL( 'general' ) ][ RL( 'total' ) ].sec ).ja;
      }
    } );
    S[ RL( 'general' ) ][ RL( 'total' ) ].nums = '-';
  }
  projector.renderNow();
}

const runTesseract = async ( ctx ) => {
  let opt = {
    logger: jnl,
    tessedit_char_whitelist: WHITELIST()
  };
  let{ data: { text } } = await Tesseract.recognize( ctx, LANG, opt );
  Object.keys( CVT ).map( e => { text = text.split( e ).join( CVT[ e ] ); } );
  Logger.INF( text );
  return text;
}

const recognizer = async ( rect, files ) => {
  if( !qs( '#burst' ).checked ) {
    for( let fi = 0; fi < files.length; fi++ ) {
      let x = await loadImage( files[ fi ] );
      for( let ri = 0; ri < rect.length; ri++ ) {
        await textNormalize( rect[ ri ], x, files[ fi ] );
      }
    }
  } else {
    files.map( async f => {
      let x = await loadImage( f ); rect.map( async ( a, i ) => textNormalize( a, x, f ) );
    } );
  }
}

const autoErrorRecover = async () => {
  let errList = Object.keys( T ).filter( e => F[ e ].error && !F[ e ].retry );
  for( let ei = 0; ei < errList.length; ei ++ ) {
    let eid = errList[ ei ]; let ie = F[ eid ];
    let orgScale = SCALE;
    SCALE = ie.scale === '10' ? '1' : `${ Number( ie.scale ) + 1 }`;
    ie.scale = SCALE;
    let rr = await textNormalize( ie.rect, ie.img );
    SCALE = orgScale, T[ eid ] = rr.text, ie.retry = true; delete T[ rr.id ];
    formatAndCalc();
  }
}

const formatAndCalc = intervalTimerId => {
  let l = Object.keys( T ).sort( ( a, b ) => a - b );
  let s = l.length > 0 && l.filter( e => Object.keys( T[ e ] ).length === 0 ).length === 0;
  if( s ) {
    clearInterval( intervalTimerId );

    let rs = [], ts = Object.entries( T ).map( e => e[ 1 ] );

    // summarize with parse
    for( let si = 0; si < ts.length; si += 2 ) {
      // item count check
      let flgGU = F[ Object.keys( T )[ si ] ], flgC = F[ Object.keys( T )[ si + 1 ] ];

      if( isNaN( parseInt( ts[ si + 1 ], 10 ) ) ) {
        flgC.error = true; flgC.retry = false; continue;
      }
      let f = 1, kv = [], tx, tl, mt;
      switch( LANG ) {
        case LANGS.eng:
          tx = ts[ si ].replace( /[()]/g, '' ).replace( RL( 'spdup' ), '' );
          mt = tx.match( /[0-9]+/ );
          if( !mt ) {
            flgGU.error = true; flgGU.retry = false; continue;
          }
          tl = tx.indexOf( mt[ 0 ] );
          kv.push( tx.substr( 0, tl ) ); kv.push( tx.substr( tl ) );
          break;

        default:
        // case LANGS.chi_tra:
          tx = ts[ si ];
          mt = tx.match( /[0-9]+/ );
          if( !mt ) {
            flgGU.error = true; flgGU.retry = false; continue;
          }
          tl = tx.indexOf( mt[ 0 ] );
          kv.push( tx.substr( 0, tl ).replace( RL( 'spdup' ), '' ) ); kv.push( tx.substr( tl ) );
          break;

        // default:
        //   kv = ts[ si ].split( RL( 'spdup' ) );
        //   break;
      }
      let v = kv[ 1 ].replace( /[^0-9]*([0-9]+)[^0-9]*/, '$1' );
      let xp = { m: MI, h: HR, d: DY };
      Object.keys( xp ).map( unitName => {
        if( kv[ 1 ].indexOf( RL( unitName ) ) > -1 ) {
          f *= xp[ unitName ]; kv[ 1 ] = `${ v }${ unitName }`;
        }
      } );

      if( kv[ 0 ] === '' ) kv[ 0 ] = RL( 'general' );
      let excludePattern = kv[ 1 ].indexOf( RL( 'pct' ) ) > -1 || kv[ 0 ].indexOf( RL( 'boots' ) ) > -1;
      if( !GENRES().find( e => e === kv[ 0 ] ) && !excludePattern ) {
        flgGU.error = true; flgGU.retry = false; continue;
      }
      if( !UNITS.find( e => e === kv[ 1 ] ) && !excludePattern ) {
        flgGU.error = true; flgGU.retry = false; continue;
      }
      if( !S[ kv[ 0 ] ] ) S[ kv[ 0 ] ] = {};
      let sc = v * f * ts[ si + 1 ];
      S[ kv[ 0 ] ][ kv[ 1 ] ] = { sec: sc, nums: ts[ si + 1 ] };
    }
    autoErrorRecover();
    calc();
    globalThis.stat = RL( 'recognitionDone' ); cProj.renderNow();

  }
}

const gmc = ( v, c ) => { return ~~( 255 * Math.pow( v / 255, 1 / c ) ); }

const toCanvas = ( a, x ) => {
  let __c = _d.createElement( 'canvas' ); __c.id = `${ Date.now() }`; __c.setAttribute( 'class', 'hidden' );
  T[ __c.id ] = {};
  F[ __c.id ] = { scale: SCALE, img: x, row: a[ 4 ], kind: a[ 5 ], retry: false, error: false, rect: a };

  GALLERY.append( __c );
  let ctx = __c.getContext( '2d' );
  let [ sx, sy, sw, sh ] = [ a[ 0 ] * x.width, a[ 1 ] * x.height, a[ 2 ] * x.width, a[ 3 ] * x.height ];
  __c.width = sw * SCALE, __c.height = sh * SCALE; ctx.scale( SCALE, SCALE );
  ctx.drawImage( x, sx, sy, sw, sh, 0, 0, sw, sh );
  let src = ctx.getImageData( 0, 0, __c.width, __c.height ); let d = src.data;
  for( let i = 0; i < d.length; i += 4 ) {
    let gs = d[ i ] * 0.2126 + d[ i + 1 ] * 0.7152 + d[ i + 2 ] * 0.0722;
    d[ i ] = d[ i + 1 ] = d[ i + 2 ] = gs < 128 ? 0 : gs * 1.5;
  }
  ctx.putImageData( src, 0, 0 );
  return __c;
}

const textNormalize = async ( rect, img ) => {
  let ctx = toCanvas( rect, img, SCALE );
  T[ ctx.id ] = await runTesseract( ctx );
  return { id: ctx.id, text: T[ ctx.id ] };
}

const recognize = async ( e ) => {
  GALLERY.innerHTML = ''; let files = [ ... e.target.files ]; T = {};
  recognizer( RECT_TABLE(), files );
  qs( '#image_zone' ).value = '';
  let mj = setInterval( () => { formatAndCalc( mj ); }, 100 );
}

/**
 * 
 */
globalThis.countEditor = { show: false, genre: '', unit: '', value: 0 };
const tableTouch = e => {
  let ds = e.target.parentElement.dataset;
  let g = ds.genre, u = ds.unit;
  countEditor = { show: true, genre: g, unit: u, value: S[ g ] ? S[ g ][ u ] ? S[ g ][ u ].nums : 0 : 0 };
  eProj.renderNow();
}
const editOk = e => {
  let c = countEditor;

  if( !S[ c.genre ] ) S[ c.genre ] = {};
  if( !S[ c.genre ][ c.unit ] ) S[ c.genre ][ c.unit ] = {};

  S[ c.genre ][ c.unit ].nums = `${ qs( '#ne' ).value }`;
  S[ c.genre ][ c.unit ].sec = TOSEC[ UNITS.indexOf( c.unit ) ] * S[ c.genre ][ c.unit ].nums;
  c.show = false;
  eProj.renderNow();
  calc();
}
const editCancel = e => {
  countEditor.show = false; eProj.renderNow();
}
const editDelete = e => {
  let c = countEditor;
  if( confirm( RL( 'confirmDelete' ) ) ) {
    delete S[ c.genre ][ c.unit ];
    c.show = false; eProj.renderNow();
    calc();
  }
}
const onTouchHeader = e => {
  if( !globalThis.amendKey ) return;
  let oth = e.target.dataset.key;
  CVT[ amendKey ] = oth; localStorage.setItem( 'CVT', JSON.stringify( CVT ) );
  Logger.INF( `${ RL( 'savedConvertSetting' ) } ${ amendKey }" = "${ oth }"` );
}
const headerRender = () => {
  let a = A( { id: 'instructions', href: 'https://github.com/kawase-fx/lm-sppedup-calculator' }, [ RL( 'instructions' ) ] );
  return DIV( { id: 'header' }, [ P( { id: 'caption' }, [ RL( 'caption' ), a ] ) ] );
}
const param = () => {
  if( LANG !== qs( '#lang' ).value ) {
    LANG = qs( '#lang' ).value; localStorage.setItem( 'lang', LANG );
    globalThis.stat = RL( 'readied' );
    hProj.renderNow(); cProj.renderNow(); projector.renderNow();
  }
  if( SCALE !== qs( '#scale' ).value ) {
    SCALE = qs( '#scale' ).value; localStorage.setItem( 'scale', SCALE ); cProj.renderNow();
  };
  if( MULTI !== qs( '#burst' ).checked ) {
    MULTI = qs( '#burst' ).checked; localStorage.setItem( 'multi', MULTI ); cProj.renderNow();
  }
}
const cpnlRender = () => {
  return DIV( { class: 'cpnl' }, [

    DIV( { class: 'file' }, [
      INPUT( { id: 'image_zone', type: 'file', multiple: 'multiple', accept: 'image/*', onchange: recognize }, [] )
    ] ),

    DIV( { class: 'log' }, [ TEXTAREA( { id: 'log', onselect: log2cvt }, [] ) ] ),

    DIV( { class: 'lang ps' }, [
      LABEL( { for: 'lang' }, [ RL( 'language' ) ] ),
      SELECT( { id:'lang', onchange: param }, Object.keys( LANGS ).map( k => {
        let oa = { value: k }; if( LANG === k ) oa.selected = '';
        return OPTION( oa, [ k ] );
      } ) )
    ] ),

    DIV( { class: 'burst ps' }, [
      LABEL( { for: 'burst' }, [ RL( 'multiWork' ) ] ),
      INPUT( { id: 'burst', type: 'checkbox', checked: MULTI, onclick: param }, [] ),
      SPAN( { id: 'bp' }, [ MULTI ? `ON` : `OFF` ] ) ] ),

    DIV( { class: 'scale ps' }, [
      LABEL( { for: 'scale' }, [ RL( 'scalingRate' ) ] ),
      INPUT( { id: 'scale', type: 'range', min: '1', max: '10', value: `${ SCALE }`, onchange: param }, [] ),
      SPAN( { id: 'sp' }, [ `[${ SCALE }]` ] ) ] ),

    DIV( { class: 'stat vs' }, [
      SPAN( { id: 'stat' }, [ stat ] ), PROGRESS( { id: 'p', value: progressValue, max: '100' }, [] )
    ] )
  ] );
}
const tableRender = () => {
  let j = [ TH( { class: 'home' }, [ RL( 'tableHome' ) ] ) ];
  GENRES().map( e => { j.push( TH( { id: e, 'data-key': e, onclick: onTouchHeader }, [ e ] ) ) } );
  let hdr = TR( { id: 'colHeader' }, [ j ] );

  let rows = UNITS.map( e => {
    let k = LANG !== LANGS.eng ? e.replace( /m/, RL( 'm' ) ).replace( /h/, RL( 'h' ) ).replace( /d/, RL( 'd' ) ) : e;
    let c = [ TH( { 'data-key': k, onclick: onTouchHeader }, [ e ] ) ];
    GENRES().map( row => {
      let d = S[ row ]; let v = d ? S[ row ][ e ] : null;
      let w = [
        SPAN( { id: `${ row }${ e }nums`, class: 'nums' }, [ `${ v ? v.nums : '-' }` ] ),
        SPAN( { id: `${ row }${ e }vals`, class: 'vals' }, [ `${ v ? s2dhms( v.sec ).ja : '-' }` ] ),
      ];
      c.push( TD( { id: `${ row }${ e }`, class: 'cell', 'data-genre': `${ row }`, 'data-unit': `${ e }`, onclick: tableTouch }, w ) );
    } );
    return TR( { id: e }, [ c ] );
  } );

  let ft = [ TH( { id: 'colTotal' }, [ RL( 'total' ) ] ) ];
  GENRES().map( row => {
    let mt = S[ row ] ? S[ row ][ RL( 'total' ) ].nums : '-';
    let st = S[ row ] ? s2dhms( S[ row ][ RL( 'total' ) ].sec ).ja : '-';
    let wt = [
      SPAN( { id: `${ row }nums`, class: 'nums' }, [ `${ mt }` ] ),
      SPAN( { id: `${ row }vals`, class: 'vals' }, [ `${ st }` ] )
    ];
    ft.push( TD( { id: `${ row }colTotal`, class: 'cell', 'data-genre': `${ row }`, 'data-unit': RL( 'total' ) }, wt ) );
  } );
  ft = TR( { id: 'subtotal' }, [ ft ] );

  return DIV( { id: 'result' }, [ TABLE( { id: 'mtx' }, [ hdr, ft, rows ] ) ] );
}
const editPaneRender = () => {
  let c = countEditor;
  return DIV( { id: 'directInput', 'data-genre': c.genre, 'data-unit': c.unit, classes: { hidden: !c.show } }, [
    DIV( { id: 'editFor' }, [
      SPAN( { id: 'genre' }, [ c.genre ] ), SPAN( { id: 'unit' }, [ c.unit ] )
    ] ),
    DIV( { id: 'numEdit' }, [
      LABEL( {}, [ RL( 'itemCount' ) ] ),
      INPUT( { id: 'ne', class: 'numEdit', type: 'number', min: '0', step: '1', value: c.value }, [] )
    ] ),
    DIV( { id: 'editOps' }, [
      BUTTON( { id: 'editOk', class: 'editButton', onmouseup: editOk }, [ RL( 'saveCount' ) ] ),
      BUTTON( { id: 'editCancel', class: 'editButton', onmouseup: editCancel }, [ RL( 'cancelEdit' ) ] ),
      BUTTON( { id: 'delete', class: 'editButton', onmouseup: editDelete }, [ RL( 'deleteCount' ) ] ),
    ] )
  ] );

}

hProj = createProjector(); hProj.append( qs( '.container' ), headerRender );
cProj = createProjector(); cProj.append( qs( '.container' ), cpnlRender );
[ ... qs( '#lang' ).options ].find( e => e.value === LANG ).selected = true;
eProj = createProjector(); eProj.append( qs( '.container' ), editPaneRender );

projector = createProjector(); projector.append( qs( '.container' ), tableRender );

qs( '#image_zone' ).focus();
