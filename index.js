class Logger { static INF( m ) { qs( '#log' ).textContent += `${ m }\n`; qs( '#log' ).scrollTop = qs( '#log' ).scrollHeight; } }

class MaquetteUtil {
  static init( g ) {
    g.h = maquette.h;
    g.createProjector = () => maquette.createProjector();
    g.qs = ( s ) => document.querySelector( s );
    g.qsa = ( s ) => document.querySelectorAll( s );
    [
      'TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'HEADER',
      'IMG', 'INPUT', 'DIV', 'SPAN', 'LABEL', 'PRE', 'I', 'STYLE', 'A', 'BR',
      'BUTTON', 'SELECT', 'OPTION', 'DATALIST', 'SCRIPT', 'LINK', 'UL', 'LI', 'IFRAME'
    ].map( elementName => {
      let tag = elementName.toLowerCase(), evol = `g.${ elementName } = ( attributes, content ) => { return h( '${ tag }', attributes, [ content ] ); }`;
      eval( evol );
    } );
  }
}
MaquetteUtil.init( globalThis );

let SCALE = 1, THRESHOLD = 120, LANG = 'jpn';
const _d = document, MI = 60, HR = MI * 60, DY = HR * 24;
const p = qs( '#p' ), stat = qs( '#stat' ), GALLERY = qs( '#gallery' );
const RECT_TABLE = [
  [ 0.1875, 0.2704, 0.2604, 0.037 ,1 ], [ 0.1, 0.3926, 0.0938, 0.037, 1 ],
  [ 0.1875, 0.4685, 0.2604, 0.037, 2 ], [ 0.1, 0.5926, 0.0938, 0.037, 2 ],
  [ 0.1875, 0.6685, 0.2604, 0.037, 3 ], [ 0.1, 0.7926, 0.0938, 0.037, 3 ]
];

const CVT = {};
if( !localStorage.getItem( 'CVT' ) ) {
  Object.assign( CVT, {
    ' ': '', '\n': '', '。': '', '_': '', 'い': '',
    '錦': '錬', '致': '数', '攻': '数', '呑': '間',  '問': '間', '閾': '間', 'ピードピード': 'ピード',
    '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9', '⑩': '10',
    '⑪': '11', '⑫': '12', '⑬': '13', '⑭': '14', '⑮': '15', '⑯': '16', '⑰': '17', '⑱': '18', '⑲': '19', '⑳': '20',
    '切': '分', '呂': '間',
    '所持数:': '', '.': '', ',': '', '修復': '',
  } );
  localStorage.setItem( 'CVT', JSON.stringify( CVT ) );
} else {
  Object.assign( CVT, JSON.parse( localStorage.getItem( 'CVT' ) ) );
}


GENRES = [ '汎用', '研究', '城壁', '治療', '訓練', '精製', '錬成' ];
UNITS = [ '1m', '3m', '5m', '10m', '15m', '30m', '60m', '3h', '8h', '15h', '24h', '3d', '7d', '30d' ];
TOSEC = [ MI, MI * 3, MI * 5, MI * 10, MI * 15, MI * 30, HR, HR * 3, HR * 8, HR * 15, DY, DY * 3, DY * 7, DY * 30 ];

globalThis.T = {}, globalThis.S = {};

const tableTouch = e => {
  let parent = e.target.parentElement; let g = parent.dataset.genre, u = parent.dataset.unit;
  let ne = qs( '#numEdit' ), di = qs( '#directInput' );
  ne.classList.remove( 'hidden' );
  qs( '#editFor #genre' ).textContent = g;
  qs( '#editFor #unit' ).textContent = u;
  qs( '#ne' ).value = S[ g ] ? S[ g ][ u ] ? S[ g ][ u ].nums : 0 : 0;
  di.dataset.genre = g, di.dataset.unit = u;
  di.classList.remove( 'hidden' );
}

const editOk = e => {
  let di = qs( '#directInput' ); let g = di.dataset.genre, u = di.dataset.unit;
  if( u === '合計' ) {
    let [ d, h, m ] = [ qs( '#de' ).value, qs( '#he' ).value, qs( '#me' ).value ];
    if( !S[ g ] ) S[ g ] = {};
    if( !S[ g ][ u ] ) S[ g ][ u ] = {};
    S[ g ][ u ].sec = d * DY + h * HR + m * MI;
  } else {
    if( !S[ g ] ) S[ g ] = {};
    if( !S[ g ][ u ] ) S[ g ][ u ] = {};
    S[ g ][ u ].nums = `${ qs( '#ne' ).value }`;
    S[ g ][ u ].sec = TOSEC[ UNITS.indexOf( u ) ] * S[ g ][ u ].nums;
  }
  di.classList.add( 'hidden' );
  calc();
}

const editCancel = e => {
  qs( '#directInput' ).classList.add( 'hidden' );
}

const editDelete = e => {
  let di = qs( '#directInput' ); let g = di.dataset.genre, u = di.dataset.unit;
  if( confirm( '削除していいですか？' ) ) {
    delete S[ g ][ u ];
    qs( '#directInput' ).classList.add( 'hidden' );
    calc();
  }
}

const log2cvt = e => {
  ta = e.target;
  globalThis.amendKey = ta.value.slice( ta.selectionStart, ta.selectionEnd );
  if( amendKey ) Logger.INF( `${ amendKey }を置き換える文字を表見出しから選んでください。` );
}

const onTouchHeader = e => {
  if( !globalThis.amendKey ) return;
  let oth = e.target.dataset.key;
  CVT[ amendKey ] = oth; localStorage.setItem( 'CVT', JSON.stringify( CVT ) );
  Logger.INF( `識字設定を保存しました。${ amendKey }"＝"${ oth }"` );
}

const tableRender = () => {
  let j = [ TH( { class: 'home' }, [ '種類/単位' ] ) ];
  GENRES.map( e => { j.push( TH( { id: e, 'data-key': e, onclick: onTouchHeader }, [ e ] ) ) } );
  let hdr = TR( { id: '列見出' }, [ j ] );

  let rows = UNITS.map( e => {
    let k = e.replace( /m/, '分' ).replace( /h/, '時間' ).replace( /d/, '日' );
    let c = [ TH( { 'data-key': k, onclick: onTouchHeader }, [ e ] ) ];
    GENRES.map( row => {
      let d = S[ row ]; let v = d ? S[ row ][ e ] : null;
      let w = [
        SPAN( { id: `${ row }${ e }nums`, class: 'nums' }, [ `${ v ? v.nums : '-' }` ] ),
        SPAN( { id: `${ row }${ e }vals`, class: 'vals' }, [ `${ v ? s2dhms( v.sec ).ja : '-' }` ] ),
      ];
      c.push( TD( { id: `${ row }${ e }`, class: 'cell', 'data-genre': `${ row }`, 'data-unit': `${ e }`, onclick: tableTouch }, w ) );
    } );
    return TR( { id: e }, [ c ] );
  } );

  let ft = [ TH( { id: '合計列' }, [ '合計' ] ) ];
  GENRES.map( row => {
    let mt = S[ row ] ? S[ row ][ '合計' ].nums : '-';
    let st = S[ row ] ? s2dhms( S[ row ][ '合計' ].sec ).ja : '-';
    let wt = [
      SPAN( { id: `${ row }nums`, class: 'nums' }, [ `${ mt }` ] ),
      SPAN( { id: `${ row }vals`, class: 'vals' }, [ `${ st }` ] )
    ];
    ft.push( TD( { id: `${ row }合計`, class: 'cell', 'data-genre': `${ row }`, 'data-unit': `合計` }, wt ) );
  } );
  ft = TR( { id: 'subtotal' }, [ ft ] );

  return TABLE( { id: 'mtx' }, [ hdr, ft, rows ] );
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
  stat.textContent = `${ m.status }`; p.setAttribute( 'value', Number( pct ) );
}

const toCanvas = ( a, x, scale ) => {
  let __c = _d.createElement( 'canvas' );
  if( scale ) {
    __c.id = `${ Date.now() }`; __c.setAttribute( 'class', 'hidden' ); T[ __c.id ] = {};
  } else {
    __c.setAttribute( 'class', 'view' );
  }
  GALLERY.append( __c );
  let ctx = __c.getContext( '2d' );
  let [ sx, sy, sw, sh ] = [ a[ 0 ] * x.width, a[ 1 ] * x.height, a[ 2 ] * x.width, a[ 3 ] * x.height ];
  if( scale ) {
    __c.width = sw * scale, __c.height = sh * scale; ctx.scale( scale, scale );
  }
  ctx.drawImage( x, sx, sy, sw, sh, 0, 0, sw, sh );
  let src = ctx.getImageData( 0, 0, __c.width, __c.height );
  let d = src.data;
  for( let i = 0; i < d.length; i += 4 ) {
    let b = 0.34 * d[ i ] + 0.5 * d[ i + 1 ] + 0.16 * d[ i + 2 ]; b = b > THRESHOLD ? b + 32 : 0;
    d[ i ] = b; d[ i + 1 ] = b; d[ i + 2 ] = b;
  }
  ctx.putImageData( src, 0, 0 );
  return __c;
}

const calc = () => {
  Object.keys( S ).filter( e => !GENRES.find( f => f === e ) ).map( x => { delete S[ x ] } );

  Object.keys( S ).map( k => {
    let st, kt = Object.keys( S[ k ] ).filter( e => e !== '合計' );
    if( kt.length > 0 ) {
      st = kt.map( e => S[ k ][ e ].sec ).reduce( ( acc, cur ) => acc + cur );
      S[ k ][ '合計' ] = { nums: 0, sec: st };
    } else {
      delete S[ k ];
    }
  } );

  if( S[ '汎用' ] ) {
    [ '研究', '城壁', '治療', '訓練' ].map( k => {
      if( S[ k ] ) {
        let st = S[ k ][ '合計' ];
        st.nums = s2dhms( st.sec + S[ '汎用' ][ '合計' ].sec ).ja;
      }
    } );
    S[ '汎用' ][ '合計' ].nums = '-';
  }
  projector.renderNow();
}

const formatAndCalc = intervalTimerId => {
  let l = Object.keys( T ).sort( ( a, b ) => a - b );
  let s = l.length > 0 && l.filter( e => Object.keys( T[ e ] ).length === 0 ).length === 0;
  if( s ) {
    globalThis.endTime = Date.now();
    Logger.INF( '処理時間: ' + s2dhms( endTime - startTime, true ).jb );
    clearInterval( intervalTimerId );

    let rs = [], ts = Object.entries( T ).map( e => e[ 1 ] );
    for( let si = 0; si < ts.length; si += 2 ) {
      try {
        let f = 1, kv = ts[ si ].split( 'スピードアップ' );
        let v = kv[ 1 ].replace( /[分時間日]+/, '' );
        if( kv[ 1 ].indexOf( '分' ) > -1 ) { f *= MI; kv[ 1 ] = kv[ 1 ].replace( /分/, 'm' ); }
        if( kv[ 1 ].indexOf( '時間' ) > -1 ) { f *= HR; kv[ 1 ] = kv[ 1 ].replace( /時間/, 'h' ); }
        if( kv[ 1 ].indexOf( '日' ) > -1 ) { f *= DY; kv[ 1 ] = kv[ 1 ].replace( /日/, 'd' ); }

        if( kv[ 0 ] === '' ) kv[ 0 ] = '汎用';
        if( !S[ kv[ 0 ] ] ) S[ kv[ 0 ] ] = {};
        let sc = v * f * ts[ si + 1 ];
        S[ kv[ 0 ] ][ kv[ 1 ] ] = { sec: sc, nums: ts[ si + 1 ] };
      } catch( e ) {
        qs( '#stat' ).textContent = e.message;
      }
    }
    calc();
    stat.textContent = 'done.'
    alert( '読み取りが完了しました。' );
  }
}

const recognize = async ( e ) => {
  GALLERY.innerHTML = ''; let files = [ ... e.target.files ]; T = {};
  globalThis.startTime = Date.now();
  if( !qs( '#burst' ).checked ) {
    for( let fi = 0; fi < files.length; fi++ ) {
      let x = await loadImage( files[ fi ] );
      for( let ri = 0; ri < RECT_TABLE.length; ri++ ) {
        let __c = toCanvas( RECT_TABLE[ ri ], x, SCALE );
        let rr = ( await Tesseract.recognize( __c, LANG, { logger: jnl } ) ).data.text;
        Object.keys( CVT ).map( e => { rr = rr.split( e ).join( CVT[ e ] ); } );
        rr = rr.replace( /[A-Za-z]/g, '' );
        T[ __c.id ] = rr;
        Logger.INF( rr );
      }
    }
  } else {
    files.map( async f => {
      RECT_TABLE.map( async ( a, i ) => {
        let x = await loadImage( f );
        let __c = toCanvas( a, x, SCALE );
        let rr = ( await Tesseract.recognize( __c, LANG, { logger: jnl } ) ).data.text;
        Object.keys( CVT ).map( e => { rr = rr.split( e ).join( CVT[ e ] ); } );
        rr = rr.replace( /[A-Za-z]/g, '' );
        T[ __c.id ] = rr;
        Logger.INF( rr );
        return rr;
      } );
    } );
  }
  qs( '#image_zone' ).value = '';
  let mj = setInterval( () => { formatAndCalc( mj ); }, 100 );
}

const param = () => {
  LANG = qs( '#lang' ).value;
  qs( '#bp' ).textContent = qs( '#burst' ).checked ? `ON` : `OFF`;
  SCALE = qs( '#scale' ).value; qs( '#sp' ).textContent = `[${ SCALE }]`;
  qs( '#stat' ).textContent = `言語:${ LANG } 二値化:${ THRESHOLD } 拡大倍率:${ SCALE }`;
}

qs( '#lang' ).addEventListener( 'change', param, false );
qs( '#burst' ).addEventListener( 'click', param, false );
qs( '#scale' ).addEventListener( 'change', param, false );

param();
qs( '#image_zone' ).addEventListener( 'change', recognize, false );

qs( '#editOk' ).addEventListener( 'mouseup', editOk, false );
qs( '#editCancel' ).addEventListener( 'mouseup', editCancel, false );
qs( '#delete' ).addEventListener( 'mouseup', editDelete, false );
qs( '#log' ).addEventListener( 'select', log2cvt, false );

projector = createProjector(); projector.append( qs( '#result' ), tableRender );
