export type StatusBarProps = {
    barStyle: 'light-content' | 'dark-content' | 'default';
    backgroundColor: string;
  };
  
  export type DimensionHelper = {
    width: number;
    height: number;
    wp: (percentage: number) => number;
    hp: (percentage: number) => number;
  };
  
  export type Colors = {
    primary: '#ef5350';
    light_primary :'#558BE0',
    primary300: '#A1BDE6';
    secondary: '#062B54';
    accent: '#E1EAF7';
    black: "#262626",
    black2:'#2B2B2B';
    white: '#ffffff';
    white20: '#ffffff33';
    blue:'#85A5CC',
    gray: '#848B8F';
    gray50: '#848B8F80';
    gray35: "#E9EEF3B3",
    gray2: '#F5F4FB';
    gray3: "#e2e8f0",
    gray4: "#828282",
    gray5:'#434343',
    gray6:'#D9D9D9',
    gray7:'#555555',
    gray8:'#9D9D9D',
    gray9:'#7B7B7B',
    gray25: "#3D3D3D",
    gray45: "#5B5B5B",
    gray90: "#262626",
    charcoal_gray:'#99A2AD',
    text: '#0052D4';
    text2: '#33415F';
    text3: '#647490';
    text4: '#2A71D4';
    text5: '#1E2945';
    text6: '#475563';
    text7: '#47556E';
    border: '#cbd5e1';
    error: "#E96143",
    error50: '#F2050533';
    error505: '#F20505';
    form: '#94a3b8';
    yellow: '#f5a623';
    name_icon: '#EF8585';
    transparent: 'transparent';
    dark_overlay: "rgba(0, 0, 0, 0.3)",
    light_overlay: 'rgba(255, 255, 255, 0.5)';
    light_blue: "#558BE016";
    sea_blue: '#3EC1D3';
    dark_blue:'#4A6491';
    light_gray: '#f8fafd';
    greenish_grey:'#003032DE';
    snackbar_success: string;
    snackbar_error: string;
    snackbar_info: string;
    success500: '#00C853';
    warning500: '#F5A623';
    error300: '#FF9999';
    error500: '#EA3100';
    purple_bg: '#F1EDFF';
    purple: '#906EFF';
    purple_50: '#F1EDFF';
    purple_300: '#906EFF';
    orange_50: '#FFF0D6';
    orange_300: '#F5A623';
    red: '#C70707';
  };
  
  export type Sizing = {
    base: 8;
    font: 14;
    unit: 1;
    s: 6;
    xs: 4;
    xxs: 2;
    m: 10;
    l: 12;
    xl: 16;
    xxl: 40;
  };
  
  export type Fonts = {
    BLD: 'Avenir-Heavy';
    REG: 'Avenir-Regular';
    BLK: 'Avenir-Black';
    LIT: 'Avenir-Light';
    BOK: 'Avenir-Book';
    // BLD_I: "DMSans-BoldItalic";
    // REG_I: "DMSans-Italic";
    // MED_I: "DMSans-MediumItalic";
  };
  
  export type Roles = 'STUDENT' | 'ALUMNI';
  
  export type Color = keyof Colors;
  
  export type Size = keyof Sizing;
  
  export type Font = keyof Fonts;
  