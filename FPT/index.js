(function(u, m, M, S, v, U, _){
  "use strict";
  const {findByProps: F} = M;
  const {storage: st} = S;
  const {Forms:{FormSection:FS,FormTitle:FT,FormText:FX},Button:FB} = U;
  const {React:R} = m;
  const {patchCall, unpatchAll} = v;
  const {logger:L} = v;

  function parseBio(b){
    const t = b?.bio?.match(/\u{e005b}\u{e0023}([0-9A-Fa-f]{1,6})\u{e002c}\u{e0023}([0-9A-Fa-f]{1,6})\u{e005d}/u);
    return t ? t.slice(1).map(x=>parseInt(x,16)) : null;
  }

  const onLoad = ()=>{
    const profileModule = F("getUserProfile");
    patchCall(profileModule, "getUserProfile", (args, ret)=>{
      const cols = parseBio(ret.user);
      if(cols){
        ret.themeColors = cols;
        ret.profileAccentColor = cols[0];
        ret.profileGradient = { colors: [`#${cols[0].toString(16).padStart(6,"0")}`, `#${cols[1].toString(16).padStart(6,"0")}`], angle: 135 };
        ret.premiumType = 2;
      }
      return ret;
    });
  };

  const onUnload = ()=>{
    unpatchAll("FakeProfileThemes");
  };

  const settings = ()=>R.createElement(
    FS, null,
    R.createElement(FT, {tag:"h3"}, "Fake Profile Themes"),
    R.createElement(FX, null,
      R.createElement(FB, {onPress:()=>L.log("Copied!")}, "Copy 3y3")
    )
  );

  u.default = { onLoad, onUnload, settings };
  Object.defineProperty(u, "__esModule", {value: true});
  return u;
})({}, vendetta.metro.common, vendetta.metro, vendetta.storage, vendetta, vendetta.ui.components, vendetta);
