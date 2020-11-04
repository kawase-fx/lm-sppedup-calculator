let SCALE = 1, THRESHOLD = 120, LANG = 'jpn';
const _d = document, MI = 60, HR = MI * 60, DY = HR * 24;
const _i = v => _d.getElementById( v );
const p = _i( 'p' ), stat = _i( 'stat' ), GALLERY = _i( 'gallery' );
const RECT_TABLE = [
  [ 0.1875, 0.2704, 0.2604, 0.037 ,1 ], [ 0.1, 0.3926, 0.0938, 0.037, 1 ],
  [ 0.1875, 0.4685, 0.2604, 0.037, 2 ], [ 0.1, 0.5926, 0.0938, 0.037, 2 ],
  [ 0.1875, 0.6685, 0.2604, 0.037, 3 ], [ 0.1, 0.7926, 0.0938, 0.037, 3 ]
];

const CVT = {
  ' ': '', '\n': '', '。': '', '_': '', 'い': '',
  '錦': '錬', '攻': '数', '呑': '間',  '問': '間', 'ピードピード': 'ピード',
  '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5',
  '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9',
  '⑪': '11', '⑫': '12', '⑮': '15',
  '⑲': '19', '⑳': '20', '切': '分', '呂': '間',
  '所持数:': '', '.': '', ',': '', '修復': '',
};
GENRES = [ '汎用', '研究', '城壁', '治療', '訓練', '精製', '錬成' ];
UNITS = [ '1m', '3m', '5m', '10m', '15m', '30m', '60m', '3h', '8h', '15h', '24h', '3d', '7d', '30d' ];

globalThis.T = {}, globalThis.S = {};

class Logger {
  static props( n ) {
    let st = ( s, l ) => { let p = l ? l : 2; return `${ '0'.repeat( p ) }${ s }`.slice( -p ); }
    return {
      YYYY: n.getFullYear(), YY: st( n.getFullYear() ), MM: st( n.getMonth() + 1 ), DD: st( n.getDate() ),
      HR: st( n.getHours() ), MI: st( n.getMinutes() ), SC: st( n.getSeconds() ), MS: st( n.getMilliseconds(), 3 )
    }
  }
  static get timeStamp() { let n = this.props( new Date() ); return `${ n.YYYY }/${ n.MM }/${ n.DD } ${ n.HR }:${ n.MI }:${ n.SC }.${ n.MS }`; }
  static INF( m ) {
    _i( 'log' ).textContent += `${ Logger.timeStamp }: ${ m }\n`;
    _i( 'log' ).scrollTop = _i( 'log' ).scrollHeight;
  }
}

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

const tableRender = () => {
  let j = [ TH( { class: 'home' }, [ '種類/単位' ] ) ];
  UNITS.map( e => { j.push( TH( { id: e }, [ e ] ) ) } );
  j.push( TH( { id: '合計列' }, [ '合計' ] ) );
  let hdr = TR( { id: '列見出' }, [ j ] );

  let rows = GENRES.map( row => {
    let c = [ TH( {}, [ row ] ) ];
    UNITS.map( e => {
      let d = S[ row ]; let v = d ? S[ row ][ e ] : null;
      let w = [
        SPAN( { id: `${ row }${ e }nums`, class: 'nums' }, [ `${ v ? v.nums : '-' }` ] ),
        SPAN( { id: `${ row }${ e }vals`, class: 'vals' }, [ `${ v ? s2dhms( v.sec ).ja : '-' }` ] ),
      ];
      c.push( TD( { id: `${ row }${ e }`, class: 'cell' }, w ) );
    } );
    let mt = S[ row ] ? S[ row ][ '合計' ].nums : '-';
    let st = S[ row ] ? s2dhms( S[ row ][ '合計' ].sec ).ja : '-';
    let wt = [
      SPAN( { id: `${ row }nums`, class: 'nums' }, [ `${ mt }` ] ),
      SPAN( { id: `${ row }vals`, class: 'vals' }, [ `${ st }` ] )
    ];
    c.push( TD( { id: `${ row }合計`, class: 'cell' }, wt ) );
    return TR( { id: row }, [ c ] );
  } );
  return TABLE( { id: 'mtx' }, [ hdr, rows ] );
}

const sleep = msec => new Promise( resolve => setTimeout( resolve, msec ) );

const s2dhms = s => {
  let m = s, r = {};
  r.d = Math.floor( s / DY ); m -= r.d * DY;
  r.h = Math.floor( m / HR ); m -= r.h * HR;
  r.m = Math.floor( m / MI ); m -= r.m * MI;
  r.s = m; r.ja = `${ r.d }`.padStart( 2, '0' ) + `d` + `${ r.h }`.padStart( 2, '0' ) + `h` + `${ r.m }`.padStart( 2, '0' ) + `m`;
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
  stat.textContent = `${ m.status }: ${ pct }%`; p.setAttribute( 'value', Number( pct ) );
  if( pct === '100.00' ) Logger.INF( `${ m.status }` );
}

const toCanvas = ( a, x, scale ) => {
  let __c = _d.createElement( 'canvas' );
  if( scale ) {
    __c.id = `${ Date.now() }`; __c.setAttribute( 'class', 'scaled' ); T[ __c.id ] = {};
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

const formatAndCalc = intervalTimerId => {
  let l = Object.keys( T ).sort( ( a, b ) => a - b );
  let s = l.length > 0 && l.filter( e => Object.keys( T[ e ] ).length === 0 ).length === 0;
  if( s ) {
    Logger.INF( `complete prepare for set of text.` );
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
        _i( 'stat' ).textContent = e.message;
      }
    }
    Object.keys( S ).map( k => {
      let kt = Object.keys( S[ k ] ).filter( e => e !== '合計' ).map( e => S[ k ][ e ].sec ).reduce( ( acc, cur ) => acc + cur );
      S[ k ][ '合計' ] = { nums: 0, sec: kt };
    } );
    [ '研究', '城壁', '治療', '訓練' ].map( k => {
      if( S[ k ] ) {
        let st = S[ k ][ '合計' ];
        st.nums = s2dhms( st.sec + S[ '汎用' ][ '合計' ].sec ).ja;
      }
    } );
    S[ '汎用' ][ '合計' ].nums = '-';

    projector.renderNow();
    stat.textContent = 'done.'
    Logger.INF( stat.textContent );

  }
}

const recognize = async ( e ) => {
  GALLERY.innerHTML = ''; let fileList = _i( 'files' ); fileList.innerHTML = '';
  let files = [ ... e.target.files ]; T = {};
  files.map( e => {
    let o = document.createElement( 'option' ); o.textContent = e.name; fileList.append( o );
  } );
  Logger.INF( `${ files.length } file(s) selected.` );

  for( let fi = 0; fi < files.length; fi++ ) {
    let x = await loadImage( files[ fi ] );
    for( let ri = 0; ri < RECT_TABLE.length; ri++ ) {
      let __c = toCanvas( RECT_TABLE[ ri ], x, SCALE );
      let rr = ( await Tesseract.recognize( __c, LANG, { logger: jnl } ) ).data.text;
      Object.keys( CVT ).map( e => { rr = rr.split( e ).join( CVT[ e ] ); } );
      rr = rr.replace( /[A-Za-z]/g, '' );
      T[ __c.id ] = rr;
      Logger.INF( `reformed text is ${ rr }.` );
    }
  }
  // files.map( async f => {
  //   // RECT_TABLE.map( async ( a, i ) => {
  //   //   Logger.INF( `start processing rectangle ${ i }.` );
  //   //   let x = await loadImage( f );
  //   //   let __c = toCanvas( a, x, SCALE );
  //   //   let rr = ( await Tesseract.recognize( __c, LANG, { logger: jnl } ) ).data.text;
  //   //   Object.keys( CVT ).map( e => { rr = rr.split( e ).join( CVT[ e ] ); } );
  //   //   rr = rr.replace( /[A-Za-z]/g, '' );
  //   //   T[ __c.id ] = rr;
  //   //   Logger.INF( `reformed text is ${ rr }.` );
  //   //   return rr;
  //   // } );
  // } );
  await sleep( 400 );
  _i( 'image_zone' ).value = '';
  Logger.INF( `monitoring...` );
  let mj = setInterval( () => { formatAndCalc( mj ); }, 100 );
}

const param = () => {
  LANG = _i( 'lang' ).value;
  THRESHOLD = _i( 'bright' ).value; _i( 'bp' ).textContent = `[${ THRESHOLD }]`;
  SCALE = _i( 'scale' ).value; _i( 'sp' ).textContent = `[${ SCALE }]`;
  _i( 'stat' ).textContent = `言語:${ LANG } 二値化:${ THRESHOLD } 拡大倍率:${ SCALE }`;
}

_i( 'lang' ).addEventListener( 'change', param, false );
_i( 'bright' ).addEventListener( 'change', param, false );
_i( 'scale' ).addEventListener( 'change', param, false );

param();
_i( 'image_zone' ).addEventListener( 'change', recognize, false );

projector = createProjector(); projector.append( qs( '#result' ), tableRender );
