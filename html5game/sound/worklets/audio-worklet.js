﻿AudioWorkletProcessor.prototype._o1=function(){this._p1=true;this.port.onmessage=(_q1)=>{if(_q1.data==="kill")this._p1=false;};};class _r1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._o1();}process(_s1,_t1,parameters){const input=_s1[0];const bypass=parameters.bypass;for(let c=0;c<input.length;++c){const _u1=input[c];for(let _v1=0;_v1<_u1.length;++_v1){const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];
_t1[_w1][c][_v1]=_u1[_v1];}}return this._p1;}}class _x1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._o1();}process(_s1,_t1,parameters){const _y1=_s1[0];const _z1=_s1[1];const output=_t1[0];const gain=parameters.gain;for(let c=0;c<_z1.length;++c){const _u1=_z1[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1)_A1[_v1]=_u1[_v1];}for(let c=0;c<_y1.length;++c){const _u1=_y1[c];const _A1=output[c];
for(let _v1=0;_v1<_u1.length;++_v1){const _B1=(gain[_v1]!==undefined)?gain[_v1]:gain[0];_A1[_v1]+=_u1[_v1]*_B1;}}return this._p1;}}registerProcessor("audio-bus-input",_r1);registerProcessor("audio-bus-output",_x1);class _C1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100}
,{name:"resolution",automationRate:"a-rate",defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _D1=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._G1=new Float32Array(_F1);this._H1=new Uint32Array(_F1);}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const gain=parameters.gain;
const factor=parameters.factor;const resolution=parameters.resolution;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){_A1[_v1]=_u1[_v1];if(this._H1[c]===0)this._G1[c]=_u1[_v1];const _I1=(factor[_v1]!==undefined)?factor[_v1]:factor[0];++this._H1[c];this._H1[c]%=_I1;const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];if(_w1>0.0){continue;}let _J1=this._G1[c];const _B1=(gain[_v1]!==undefined)?gain[_v1]:gain[0];_J1*=_B1;_J1=Math.max(Math.min(_J1,
1.0),-1.0);const _K1=(resolution[_v1]!==undefined)?resolution[_v1]:resolution[0];const max=(_J1>0.0)?_C1._D1[_K1]-1:_C1._D1[_K1];_J1=Math.round(_J1*max)/max;const _L1=(mix[_v1]!==undefined)?mix[_v1]:mix[0];_A1[_v1]*=(1.0-_L1);_A1[_v1]+=(_J1*_L1);}}return this._p1;}}registerProcessor("bitcrusher-processor",_C1);class _M1{constructor(_N1=1e-3){this.setTime(_N1);}setTime(_N1){this._O1=Math.exp(-1/(_N1*sampleRate));}process(_P1,_Q1){return _P1+this._O1*(_Q1-_P1);}}class _R1{constructor(_S1,_T1){this._U1=new _M1(_S1);
this._V1=new _M1(_T1);this._W1=_S1;this._X1=_T1;}_Y1(_N1){if(_N1===this._W1)return;this._U1.setTime(_N1);this._W1=_N1;}_Z1(_N1){if(_N1===this._X1)return;this._V1.setTime(_N1);this._X1=_N1;}process(_P1,_Q1){if(_P1>_Q1)return this._U1.process(_P1,_Q1);else return this._V1.process(_P1,_Q1);}}class __1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"ingain",automationRate:"a-rate",defaultValue:1,minValue:0}
,{name:"threshold",automationRate:"a-rate",defaultValue:0.125,minValue:1e-3,maxValue:1},{name:"ratio",automationRate:"a-rate",defaultValue:4,minValue:1},{name:"attack",automationRate:"a-rate",defaultValue:0.05,minValue:1e-3,maxValue:1e-1},{name:"release",automationRate:"a-rate",defaultValue:0.25,minValue:1e-2,maxValue:1},{name:"outgain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(_02){super();this._o1();const _U1=__1.parameterDescriptors.find(_12=>_12.name==="attack");const _V1=__1.parameterDescriptors.find(_12=>_12.name==="release");
this._22=new _R1(_U1.defaultValue,_V1.defaultValue);this._32=0;}process(_42,_52,_62){const input=_42[0];const output=_52[0];const bypass=_62.bypass;const ingain=_62.ingain;const outgain=_62.outgain;const threshold=_62.threshold;const ratio=_62.ratio;const attack=_62.attack;const release=_62.release;if(input.length===0)return this._p1;for(let _v1=0;_v1<input[0].length;++_v1){let frame=input.map(_72=>_72[_v1]);output.forEach((_72,_82)=>{_72[_v1]=frame[_82];});const _92=(ingain[_v1]!==undefined)?ingain[_v1]:ingain[0];
frame=frame.map(_a2=>_a2*=_92);const rect=frame.map(_a2=>Math.abs(_a2));const max=Math.max(...rect);const _b2=_c2(max);const _d2=(threshold[_v1]!==undefined)?threshold[_v1]:threshold[0];const _e2=_c2(_d2);const _f2=Math.max(0,_b2-_e2);const _U1=(attack[_v1]!==undefined)?attack[_v1]:attack[0];const _V1=(release[_v1]!==undefined)?release[_v1]:release[0];this._22._Y1(_U1);this._22._Z1(_V1);this._32=this._22.process(_f2,this._32);const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];if(_w1>0)continue;const _K1=(ratio[_v1]!==undefined)?ratio[_v1]:ratio[0];
const _g2=(this._32/_K1)-this._32;const _B1=_h2(_g2);frame=frame.map(_a2=>_a2*=_B1);const _i2=(outgain[_v1]!==undefined)?outgain[_v1]:outgain[0];frame=frame.map(_a2=>_a2*=_i2);output.forEach((_72,_82)=>{_72[_v1]=frame[_82];});}return this._p1;}}function _c2(_j2){return 20*Math.log10(_j2);}function _h2(_j2){return Math.pow(10,_j2/20);}registerProcessor("compressor-processor",__1);class _k2 extends AudioWorkletProcessor{static _l2=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1},{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_k2._l2},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];const _m2=(_k2._l2*sampleRate)+1;this.buffer=new Array(_F1);this._n2=new Uint32Array(_F1);for(let c=0;c<_F1;++c)this.buffer[c]=new Float32Array(_m2);
}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){_A1[_v1]=_u1[_v1];const _d2=(time[_v1]!==undefined)?time[_v1]:time[0];const _o2=this._p2(c,_d2);const _I1=(feedback[_v1]!==undefined)?feedback[_v1]:feedback[0];const _q2=_u1[_v1]+(_o2*_I1);this.write(c,_q2);const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];
if(_w1>0.0){continue;}const _L1=(mix[_v1]!==undefined)?mix[_v1]:mix[0];_A1[_v1]*=(1-_L1);_A1[_v1]+=(_o2*_L1);}}return this._p1;}_p2(_r2,_N1){const _s2=_N1*sampleRate;let _t2=(this._n2[_r2]-~~_s2);let _u2=(_t2-1);while(_t2<0)_t2+=this.buffer[_r2].length;while(_u2<0)_u2+=this.buffer[_r2].length;const frac=_s2-~~_s2;const _v2=this.buffer[_r2][_t2];const _w2=this.buffer[_r2][_u2];return _v2+(_w2-_v2)*frac;}write(_r2,_x2){++this._n2[_r2];this._n2[_r2]%=this.buffer[_r2].length;this.buffer[_r2][this._n2[_r2]]=_x2;
}}registerProcessor("delay-processor",_k2);class _y2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [];}constructor(){super();this._o1();}process(_z2,_A2,_B2){const input=_z2[0];const _C2=_A2[0];const _D2=_A2[1];for(let c=0;c<input.length;++c){const _u1=input[c];const _E2=_C2[c];const _F2=_D2[c];for(let _v1=0;_v1<_u1.length;++_v1){_E2[_v1]=_u1[_v1];_F2[_v1]=_u1[_v1];}}return this._p1;}}class _G2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._o1();}process(_z2,_A2,_B2){const _y1=_z2[0];const _z1=_z2[1];const output=_A2[0];const bypass=_B2.bypass;for(let c=0;c<_z1.length;++c){const _H2=_y1[c];const _I2=_z1[c];const _A1=output[c];for(let _v1=0;_v1<_H2.length;++_v1){const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];if(_w1>0){_A1[_v1]=_I2[_v1];}else {_A1[_v1]=_H2[_v1];}}}return this._p1;}}registerProcessor("eq-input",_y2);registerProcessor("eq-output",_G2);class _J2 extends AudioWorkletProcessor{
static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._o1();}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){_A1[_v1]=_u1[_v1];const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];
if(_w1>0.0){continue;}const _B1=(gain[_v1]!==undefined)?gain[_v1]:gain[0];_A1[_v1]*=_B1;}}return this._p1;}}registerProcessor("gain-processor",_J2);class _K2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _L2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(5000.0,_L2),minValue:10.0,maxValue:_L2},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0}
,{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._M2=0;this._N2=0;this._O2=0;this._P2=0;this._Q2=0;this._R2=new Float32Array(_F1);this._S2=new Float32Array(_F1);this._T2=new Float32Array(_F1);this._U2=new Float32Array(_F1);this._V2=-1;this._W2=-1;this._X2=-1;}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;
const _Y2=(freq.length===1&&q.length===1&&gain.length===1);if(_Y2)this._Z2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){if(_Y2===false){const _I1=(freq[_v1]!==undefined)?freq[_v1]:freq[0];const __2=(q[_v1]!==undefined)?q[_v1]:q[0];const _B1=(gain[_v1]!==undefined)?gain[_v1]:gain[0];this._Z2(_I1,__2,_B1);}const _03=this._O2*_u1[_v1]+this._P2*this._R2[c]+this._Q2*this._S2[c]-this._M2*this._T2[c]-this._N2*this._U2[c];this._S2[c]=this._R2[c];
this._R2[c]=_u1[_v1];this._U2[c]=this._T2[c];this._T2[c]=_03;const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];_A1[_v1]=(_w1>0)?_u1[_v1]:_03;}}return this._p1;}_Z2(_13,_23,_33){if(_13===this._V2&&_23===this._W2&&_33===this._X2)return;const _43=2*Math.PI*_13/sampleRate;const _53=Math.cos(_43);const _63=Math.sqrt(_33);const _73=_63+1;const _83=_63-1;const _93=_73*_53;const _a3=_83*_53;const _b3=_73-_a3;const _c3=_73+_a3;const alpha=Math.sin(_43)/(2*_23);const _d3=(2*Math.sqrt(_63)*alpha);const _e3=_b3+_d3;
const _M2=2*(_83-_93);const _N2=_b3-_d3;const _O2=_63*(_c3+_d3);const _P2=-2*_63*(_83+_93);const _Q2=_63*(_c3-_d3);this._M2=_M2/_e3;this._N2=_N2/_e3;this._O2=_O2/_e3;this._P2=_P2/_e3;this._Q2=_Q2/_e3;this._V2=_13;this._W2=_23;this._X2=_33;}}registerProcessor("hi-shelf-processor",_K2);class _f3 extends AudioWorkletProcessor{static get parameterDescriptors(){const _g3=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(1500.0,
_g3),minValue:10.0,maxValue:_g3},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._M2=0;this._N2=0;this._O2=0;this._P2=0;this._Q2=0;this._R2=new Float32Array(_F1);this._S2=new Float32Array(_F1);this._T2=new Float32Array(_F1);this._U2=new Float32Array(_F1);this._h3=-1;this._W2=-1;}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;
const q=parameters.q;const _Y2=(cutoff.length===1&&q.length===1);if(_Y2)this._Z2(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){if(_Y2===false){const c=(cutoff[_v1]!==undefined)?cutoff[_v1]:cutoff[0];const __2=(q[_v1]!==undefined)?q[_v1]:q[0];this._Z2(c,__2);}const _03=this._O2*_u1[_v1]+this._P2*this._R2[c]+this._Q2*this._S2[c]-this._M2*this._T2[c]-this._N2*this._U2[c];this._S2[c]=this._R2[c];this._R2[c]=_u1[_v1];this._U2[c]=this._T2[c];
this._T2[c]=_03;const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];_A1[_v1]=(_w1>0)?_u1[_v1]:_03;}}return this._p1;}_Z2(_i3,_23){if(_i3===this._h3&&_23===this._W2)return;const _43=2*Math.PI*_i3/sampleRate;const alpha=Math.sin(_43)/(2*_23);const _53=Math.cos(_43);const _e3=1+alpha;const _M2=-2*_53;const _N2=1-alpha;const _O2=(1+_53)/2;const _P2=-1-_53;const _Q2=(1+_53)/2;this._M2=_M2/_e3;this._N2=_N2/_e3;this._O2=_O2/_e3;this._P2=_P2/_e3;this._Q2=_Q2/_e3;this._h3=_i3;this._W2=_23;}}registerProcessor("hpf2-processor",
_f3);class _j3 extends AudioWorkletProcessor{static get parameterDescriptors(){const _L2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(500.0,_L2),minValue:10.0,maxValue:_L2},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];
this._M2=0;this._N2=0;this._O2=0;this._P2=0;this._Q2=0;this._R2=new Float32Array(_F1);this._S2=new Float32Array(_F1);this._T2=new Float32Array(_F1);this._U2=new Float32Array(_F1);this._V2=-1;this._W2=-1;this._X2=-1;}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _Y2=(freq.length===1&&q.length===1&&gain.length===1);if(_Y2)this._Z2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;
++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){if(_Y2===false){const _I1=(freq[_v1]!==undefined)?freq[_v1]:freq[0];const __2=(q[_v1]!==undefined)?q[_v1]:q[0];const _B1=(gain[_v1]!==undefined)?gain[_v1]:gain[0];this._Z2(_I1,__2,_B1);}const _03=this._O2*_u1[_v1]+this._P2*this._R2[c]+this._Q2*this._S2[c]-this._M2*this._T2[c]-this._N2*this._U2[c];this._S2[c]=this._R2[c];this._R2[c]=_u1[_v1];this._U2[c]=this._T2[c];this._T2[c]=_03;const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];
_A1[_v1]=(_w1>0)?_u1[_v1]:_03;}}return this._p1;}_Z2(_13,_23,_33){if(_13===this._V2&&_23===this._W2&&_33===this._X2)return;const _43=2*Math.PI*_13/sampleRate;const _53=Math.cos(_43);const _63=Math.sqrt(_33);const _73=_63+1;const _83=_63-1;const _93=_73*_53;const _a3=_83*_53;const _b3=_73-_a3;const _c3=_73+_a3;const alpha=Math.sin(_43)/(2*_23);const _d3=(2*Math.sqrt(_63)*alpha);const _e3=_c3+_d3;const _M2=-2*(_83+_93);const _N2=_c3-_d3;const _O2=_63*(_b3+_d3);const _P2=2*_63*(_83-_93);const _Q2=_63*(_b3-_d3);this._M2=_M2/_e3;
this._N2=_N2/_e3;this._O2=_O2/_e3;this._P2=_P2/_e3;this._Q2=_Q2/_e3;this._V2=_13;this._W2=_23;this._X2=_33;}}registerProcessor("lo-shelf-processor",_j3);class _k3 extends AudioWorkletProcessor{static get parameterDescriptors(){const _g3=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_g3),minValue:10.0,maxValue:_g3},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}
];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._M2=0;this._N2=0;this._O2=0;this._P2=0;this._Q2=0;this._R2=new Float32Array(_F1);this._S2=new Float32Array(_F1);this._T2=new Float32Array(_F1);this._U2=new Float32Array(_F1);this._h3=-1;this._W2=-1;}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _Y2=(cutoff.length===1&&q.length===1);if(_Y2)this._Z2(cutoff[0],q[0]);for(let c=0;
c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){if(_Y2===false){const c=(cutoff[_v1]!==undefined)?cutoff[_v1]:cutoff[0];const __2=(q[_v1]!==undefined)?q[_v1]:q[0];this._Z2(c,__2);}const _03=this._O2*_u1[_v1]+this._P2*this._R2[c]+this._Q2*this._S2[c]-this._M2*this._T2[c]-this._N2*this._U2[c];this._S2[c]=this._R2[c];this._R2[c]=_u1[_v1];this._U2[c]=this._T2[c];this._T2[c]=_03;const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];_A1[_v1]=(_w1>0)?_u1[_v1]:_03;
}}return this._p1;}_Z2(_i3,_23){if(_i3===this._h3&&_23===this._W2)return;const _43=2*Math.PI*_i3/sampleRate;const alpha=Math.sin(_43)/(2*_23);const _53=Math.cos(_43);const _e3=1+alpha;const _M2=-2*_53;const _N2=1-alpha;const _O2=(1-_53)/2;const _P2=1-_53;const _Q2=(1-_53)/2;this._M2=_M2/_e3;this._N2=_N2/_e3;this._O2=_O2/_e3;this._P2=_P2/_e3;this._Q2=_Q2/_e3;this._h3=_i3;this._W2=_23;}}registerProcessor("lpf2-processor",_k3);class _l3 extends AudioWorkletProcessor{static get parameterDescriptors(){const _L2=sampleRate*0.45;
return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(1500.0,_L2),minValue:10.0,maxValue:_L2},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._M2=0;this._N2=0;this._O2=0;this._P2=0;this._Q2=0;this._R2=new Float32Array(_F1);this._S2=new Float32Array(_F1);
this._T2=new Float32Array(_F1);this._U2=new Float32Array(_F1);this._V2=-1;this._W2=-1;this._X2=-1;}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _Y2=(freq.length===1&&q.length===1&&gain.length===1);if(_Y2)this._Z2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){if(_Y2===false){const _I1=(freq[_v1]!==undefined)?freq[_v1]:freq[0];
const __2=(q[_v1]!==undefined)?q[_v1]:q[0];const _B1=(gain[_v1]!==undefined)?gain[_v1]:gain[0];this._Z2(_I1,__2,_B1);}const _03=this._O2*_u1[_v1]+this._P2*this._R2[c]+this._Q2*this._S2[c]-this._M2*this._T2[c]-this._N2*this._U2[c];this._S2[c]=this._R2[c];this._R2[c]=_u1[_v1];this._U2[c]=this._T2[c];this._T2[c]=_03;const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];_A1[_v1]=(_w1>0)?_u1[_v1]:_03;}}return this._p1;}_Z2(_13,_23,_33){if(_13===this._V2&&_23===this._W2&&_33===this._X2)return;const _43=2*Math.PI*_13/sampleRate;
const _53=Math.cos(_43);const _63=Math.sqrt(_33);const alpha=Math.sin(_43)/(2*_23);const _m3=alpha/_63;const _n3=alpha*_63;const _e3=1+_m3;const _M2=-2*_53;const _N2=1-_m3;const _O2=1+_n3;const _P2=_M2;const _Q2=1-_n3;this._M2=_M2/_e3;this._N2=_N2/_e3;this._O2=_O2/_e3;this._P2=_P2/_e3;this._Q2=_Q2/_e3;this._V2=_13;this._W2=_23;this._X2=_33;}}registerProcessor("peak-eq-processor",_l3);class _o3{constructor(_p3){this._q3=0;this._r3=0;this.feedback=0;this._s3=0;this.buffer=new Float32Array(_p3);this._t3=0;}process(_x2){
const out=this.buffer[this._t3];this._s3=(this._s3*this._q3)+(out*this._r3);this.buffer[this._t3]=_x2+(this._s3*this.feedback);++this._t3;this._t3%=this.buffer.length;return out;}_u3(_v3){this.feedback=Math.min(Math.max(0,_v3),1);}_w3(_x3){this._q3=Math.min(Math.max(0,_x3),1);this._r3=1-this._q3;}}class _y3{constructor(_p3){this.feedback=0;this.buffer=new Float32Array(_p3);this._t3=0;}process(_x2){const out=this.buffer[this._t3];this.buffer[this._t3]=_x2+(out*this.feedback);++this._t3;this._t3%=this.buffer.length;
return(out-_x2);}_u3(_v3){this.feedback=Math.min(Math.max(0,_v3),1);}}class _z3 extends AudioWorkletProcessor{static _A3=8;static _B3=4;static _C3=0.015;static _D3=0.4;static _E3=0.28;static _F3=0.7;static _G3=[1116,1188,1277,1356,1422,1491,1557,1617];static _H3=[1139,1211,1300,1379,1445,1514,1580,1640];static _I3=[556,441,341,225];static _J3=[579,464,364,248];static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",
defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._K3=-1;this._L3=-1;this._M3=new Array(_F1);this._N3=new Array(_F1);const _O3=[_z3._G3,_z3._H3];const _P3=[_z3._I3,_z3._J3];for(let c=0;c<_F1;++c){this._M3[c]=new Array(_z3._A3);this._N3[c]=new Array(_z3._B3);for(let i=0;i<_z3._A3;
++i)this._M3[c][i]=new _o3(_O3[c%_O3.length][i]);for(let i=0;i<_z3._B3;++i)this._N3[c][i]=new _y3(_P3[c%_P3.length][i]);}this._Q3(0.5);this._w3(0.5);for(let c=0;c<_F1;++c)for(let i=0;i<_z3._B3;++i)this._N3[c][i]._u3(0.5);}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _R3=0;_R3<_u1.length;++_R3){const _v1=(size[_R3]!==undefined)?size[_R3]:size[0];
const _S3=(damp[_R3]!==undefined)?damp[_R3]:damp[0];this._Q3(_v1);this._w3(_S3);_A1[_R3]=_u1[_R3];let out=0;const _J1=_u1[_R3]*_z3._C3;for(let i=0;i<_z3._A3;++i)out+=this._M3[c][i].process(_J1);for(let i=0;i<_z3._B3;++i)out=this._N3[c][i].process(out);const _w1=(bypass[_R3]!==undefined)?bypass[_R3]:bypass[0];if(_w1>0.0){continue;}const _L1=(mix[_R3]!==undefined)?mix[_R3]:mix[0];_A1[_R3]*=(1-_L1);_A1[_R3]+=(out*_L1);}}return this._p1;}_Q3(_p3){if(_p3===this._K3)return;const size=(_p3*_z3._E3)+_z3._F3;for(let c=0;
c<this._M3.length;++c)for(let i=0;i<_z3._A3;++i)this._M3[c][i]._u3(size);this._K3=_p3;}_w3(_x3){if(_x3===this._L3)return;const damp=_x3*_z3._D3;for(let c=0;c<this._M3.length;++c)for(let i=0;i<_z3._A3;++i)this._M3[c][i]._w3(damp);this._L3=_x3;}}registerProcessor("reverb1-processor",_z3);class _T3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,
maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_E1){super();this._o1();const _F1=_E1.outputChannelCount[0];this._U3=new Array(_F1).fill(1.0);this._V3=new Array(_F1).fill(0.0);this._W3=new Array(_F1).fill(_X3._Y3._Z3);this.__3=new Array(_F1);for(let c=0;c<_F1;++c){this.__3[c]=new _04();
this.__3[c]._14(sampleRate);this.__3[c]._24(this._U3[c]);this.__3[c]._34(this._W3[c]);if(c%2===1){this.__3[c]._44(this._V3[c]);}}}process(_s1,_t1,parameters){const input=_s1[0];const output=_t1[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<input.length;++c){const _u1=input[c];const _A1=output[c];for(let _v1=0;_v1<_u1.length;++_v1){_A1[_v1]=_u1[_v1];const _K1=(rate[_v1]!==undefined)?rate[_v1]:rate[0];
const _54=(offset[_v1]!==undefined)?offset[_v1]:offset[0];const _64=(shape[_v1]!==undefined)?shape[_v1]:shape[0];this._74(c,_K1,_54,_64);const _84=this.__3[c]._p2();const _w1=(bypass[_v1]!==undefined)?bypass[_v1]:bypass[0];if(_w1>0.0){continue;}const i=(intensity[_v1]!==undefined)?intensity[_v1]:intensity[0];const out=_u1[_v1]*_84*i;_A1[_v1]*=(1.0-i);_A1[_v1]+=out;}}return this._p1;}_74(_r2,_94,_a4,_b4){if(_94!==this._U3[_r2]){this.__3[_r2]._24(_94);this._U3[_r2]=_94;}if(_a4!==this._V3[_r2]){if(_r2%2===1){
this.__3[_r2]._44(_a4);}this._V3[_r2]=_a4;}if(_b4!==this._W3[_r2]){this.__3[_r2]._34(_b4);this._W3[_r2]=_b4;}}}registerProcessor("tremolo-processor",_T3);function _X3(){}_X3._Y3={_Z3:0,_c4:1,_d4:2,_e4:3,_f4:4,_g4:5};_X3._h4=function(_i4){return 1.0-_i4;};_X3._j4=function(_i4){return _i4;};_X3._k4=function(_i4){return 0.5*(Math.sin((_i4*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_X3._l4=function(_i4){if(_i4<0.5){return 0.0;}return 1.0;};_X3._m4=function(_i4){if(_i4<0.5){return 2.0*_i4;}return 2.0-(2.0*_i4);};_X3._n4=[_X3._h4,
_X3._j4,_X3._k4,_X3._l4,_X3._m4];_o4._p4=512;_o4._q4=1.0/_o4._p4;function _o4(_r4){this.data=new Float32Array(_o4._p4);for(let i=0;i<_o4._p4;++i){this.data[i]=_r4(i*_o4._q4);}}_o4.prototype._p2=function(_i4){_i4=Math.max(0.0,_i4);_i4=Math.min(_i4,1.0);const _s4=_i4*_o4._p4;const _t4=~~_s4;const _u4=_s4-_t4;let _t2=_t4;let _u2=_t2+1;if(_t2>=_o4._p4){_t2-=_o4._p4;}if(_u2>=_o4._p4){_u2-=_o4._p4;}const _v2=this.data[_t2];const _w2=this.data[_u2];return _v2+(_w2-_v2)*_u4;};_04._v4=[];_04._w4=false;_04._x4=0.0;_04._L2=20.0;
function _04(){this._y4=48000;this.shape=_X3._Y3._d4;this.freq=1.0;this._z4=0.0;this._q4=0.0;this._A4=0.0;if(_04._w4==true){return;}for(let i=0;i<_X3._Y3._g4;++i){_04._v4[i]=new _o4(_X3._n4[i]);}_04._w4=true;}_04._B4=function(){return(_04._w4==true);};_04.prototype._14=function(_C4){this._y4=_C4;this._D4();};_04.prototype._24=function(_13){_13=Math.max(_04._x4,_13);_13=Math.min(_13,_04._L2);this.freq=_13;this._D4();};_04.prototype._44=function(_a4){_a4=Math.max(0.0,_a4);_a4=Math.min(_a4,1.0);const _E4=_a4-this._A4;
this._A4=_a4;this._z4+=_E4;while(this._z4>=1.0){this._z4-=1.0;}while(this._z4<0.0){this._z4+=1.0;}};_04.prototype._34=function(_b4){_b4=Math.max(0,_b4);_b4=Math.min(_b4,_X3._Y3._g4-1);this.shape=_b4;};_04.prototype._p2=function(){const result=_04._v4[this.shape]._p2(this._z4);this._z4+=this._q4;while(this._z4>=1.0){this._z4-=1.0;}return result;};_04.prototype._D4=function(){this._q4=this.freq/this._y4;};