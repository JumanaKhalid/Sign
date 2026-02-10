import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, Mic, Image as ImageIcon, Bell, 
  LogOut, ArrowRight, CheckCircle, Users, 
  Volume2, Smartphone, HandMetal, Heart,
  Settings, Languages, Send, AlertTriangle,
  Zap, ShieldCheck, Activity, Brain, Eye
} from 'lucide-react';

const App = () => {
  // --- State Management ---
  const [step, setStep] = useState('welcome');
  const [ageGroup, setAgeGroup] = useState(null);
  const [email, setEmail] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [inputText, setInputText] = useState("");
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [cameraStream, setCameraStream] = useState(false);
  const videoRef = useRef(null);

  // --- Theme Configuration (Optimized) ---
  const isYoung = ageGroup === 'young';
  const theme = {
    mainBg: isYoung ? 'bg-gradient-to-br from-blue-50 via-white to-blue-100' : 'bg-slate-950',
    card: isYoung ? 'bg-white/80 backdrop-blur-md' : 'bg-slate-900/90 border border-slate-800',
    text: isYoung ? 'text-blue-900' : 'text-slate-100',
    accent: isYoung ? 'bg-blue-400' : 'bg-blue-600',
    ring: isYoung ? 'ring-blue-200' : 'ring-blue-900/50',
    shadow: isYoung ? 'shadow-xl' : 'shadow-2xl shadow-blue-900/20'
  };

  // --- Real Camera Logic ---
  const toggleCamera = async () => {
    if (cameraStream) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setCameraStream(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraStream(true);
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
  };

  // --- Intelligent Sign Translation Simulation ---
  const processSignLanguage = () => {
    setIsProcessing(true);
    setPrediction("");
    setTimeout(() => {
      const phrases = ["أنا أحتاج للماء", "كيف حالك؟", "شكراً لمساعدتكم"];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setPrediction(randomPhrase);
      setIsProcessing(false);
      
      // Voice Output
      const utterance = new SpeechSynthesisUtterance(randomPhrase);
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }, 2000);
  };

  // --- Emergency Radar Logic ---
  const triggerEmergency = () => {
    setEmergencyAlert(true);
    if (navigator.vibrate) navigator.vibrate([100, 30, 100, 30, 500, 30, 500]);
    setTimeout(() => setEmergencyAlert(false), 5000);
  };

  // --- Screens ---

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-white opacity-20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative text-9xl animate-[float_3s_easeInOut_infinite]">🫱🏽‍🫲🏻</div>
        </div>
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-7xl font-black tracking-tighter drop-shadow-lg">معاً</h1>
          <h2 className="text-4xl font-light tracking-[0.2em] opacity-80 uppercase">لنساعد</h2>
        </div>
        <button 
          onClick={() => setStep('login')}
          className="group relative bg-white text-blue-600 px-20 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">ابدأ التجربة الذكية <Zap size={28} className="fill-blue-600" /></span>
          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
        <p className="mt-8 text-blue-200 text-sm font-medium animate-pulse">جارٍ تهيئة المحرك العصبي...</p>
      </div>
    );
  }

  if (step === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-[50px] p-12 w-full max-w-xl shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg rotate-6">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-800">بوابة المساعدة</h2>
            <p className="text-slate-400 mt-2">نظام تواصل ذكي لخدمة الصم والبكم</p>
          </div>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-slate-700 mb-2 mr-2">البريد الإلكتروني الذكي</label>
              <input 
                type="email" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pr-6 outline-none focus:border-blue-500 focus:bg-white transition-all text-lg"
                placeholder="user@smart-help.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setAgeGroup('young')}
                className={`p-8 rounded-[35px] border-4 transition-all flex flex-col items-center gap-3 ${ageGroup === 'young' ? 'border-blue-500 bg-blue-50 scale-105' : 'border-slate-50 bg-slate-50 opacity-60'}`}
              >
                <div className="text-5xl">🧒🏻</div>
                <span className="font-black text-blue-700">جيل الأمل</span>
                <span className="text-[10px] text-blue-400">4 - 16 سنة</span>
              </button>
              <button 
                onClick={() => setAgeGroup('senior')}
                className={`p-8 rounded-[35px] border-4 transition-all flex flex-col items-center gap-3 ${ageGroup === 'senior' ? 'border-slate-800 bg-slate-900 text-white scale-105' : 'border-slate-50 bg-slate-50 opacity-60'}`}
              >
                <div className="text-5xl">🧓🏻</div>
                <span className="font-black">جيل الحكمة</span>
                <span className="text-[10px] text-slate-400">55+ سنة</span>
              </button>
            </div>

            <button 
              disabled={!ageGroup || !email}
              onClick={() => setStep('home')}
              className="w-full bg-blue-600 text-white py-6 rounded-[25px] font-black text-xl shadow-xl hover:bg-blue-700 disabled:bg-slate-200 transition-all transform active:translate-y-1"
            >
              تفعيل النظام
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.mainBg} ${theme.text} transition-colors duration-1000`} dir="rtl">
      
      {/* Emergency Flash */}
      {emergencyAlert && (
        <div className="fixed inset-0 z-[1000] bg-red-600 animate-[pulse_0.2s_infinite] opacity-40 pointer-events-none"></div>
      )}

      {/* Modern Glass Header */}
      <header className={`p-6 sticky top-0 z-[100] border-b ${theme.border} ${theme.card} flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
              <Activity size={28} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">معاً لنساعد</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase">
              <Smartphone size={12} /> متصل بنظام الساعة v4.0
            </div>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20"><Settings size={20}/></button>
           <button onClick={() => setStep('login')} className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/20"><LogOut size={20}/></button>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto pb-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black mb-3">
              {isYoung ? 'أهلاً بك يا بطل! 🚀' : 'مرحباً بك يا والدي العزيز 👋'}
            </h1>
            <p className="text-xl opacity-60">النظام جاهز لمساعدتك في التواصل الفوري.</p>
          </div>
          <div className="flex gap-4">
             <div className={`${theme.card} p-4 rounded-3xl flex items-center gap-4 shadow-lg border-2 border-blue-400/20`}>
                <div className="p-3 bg-blue-500 rounded-2xl text-white"><Brain /></div>
                <div>
                   <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">حالة الذكاء</p>
                   <p className="font-bold">مستقر بنسبة 99%</p>
                </div>
             </div>
          </div>
        </div>

        {/* Feature Grid - Enhanced UX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* F1: AI Sign to Text */}
          <div onClick={() => setActiveFeature(1)} className={`${theme.card} p-8 rounded-[45px] group cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-500 border-b-[10px] border-blue-500 shadow-2xl`}>
             <div className="w-20 h-20 bg-blue-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/40 group-hover:rotate-12 transition-transform">
                <Camera size={40} />
             </div>
             <h3 className="text-2xl font-black mb-4 leading-tight">مترجم الإشارة <br/>الذكي (بث حي)</h3>
             <p className="opacity-50 text-sm mb-6 leading-relaxed">ترجمة فورية عبر المسح البصري لليدين وتحويلها لصوت بشري.</p>
             <div className="flex items-center gap-3 text-blue-500 font-black">تشغيل الكاميرا <ArrowRight size={20}/></div>
          </div>

          {/* F2: Text to Avatar */}
          <div onClick={() => setActiveFeature(2)} className={`${theme.card} p-8 rounded-[45px] group cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-500 border-b-[10px] border-purple-500 shadow-2xl`}>
             <div className="w-20 h-20 bg-purple-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/40 group-hover:-rotate-12 transition-transform">
                <HandMetal size={40} />
             </div>
             <h3 className="text-2xl font-black mb-4 leading-tight">تحويل الكلام <br/>إلى إشارة (أفاتار)</h3>
             <p className="opacity-50 text-sm mb-6 leading-relaxed">أفاتار حقيقي يمثل كلماتك ليفهمها الآخرون بلغة الإشارة.</p>
             <div className="flex items-center gap-3 text-purple-500 font-black">بدء التمثيل <ArrowRight size={20}/></div>
          </div>

          {/* F3: Sound Radar 360 */}
          <div onClick={() => setActiveFeature(3)} className={`${theme.card} p-8 rounded-[45px] group cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-500 border-b-[10px] border-red-500 shadow-2xl`}>
             <div className="w-20 h-20 bg-red-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-red-500/40 animate-pulse transition-transform">
                <Bell size={40} />
             </div>
             <h3 className="text-2xl font-black mb-4 leading-tight">رادار الأصوات <br/>بـ 360 درجة</h3>
             <p className="opacity-50 text-sm mb-6 leading-relaxed">الاستماع للمحيط وتنبيهك بالاهتزاز عند وجود أصوات هامة.</p>
             <div className="flex items-center gap-3 text-red-500 font-black">تفعيل الرادار <ArrowRight size={20}/></div>
          </div>

          {/* F4: Vision Pro - Image Translation */}
          <div onClick={() => setActiveFeature(4)} className={`${theme.card} p-8 rounded-[45px] group cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-500 border-b-[10px] border-emerald-500 shadow-2xl`}>
             <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                <ImageIcon size={40} />
             </div>
             <h3 className="text-2xl font-black mb-4 leading-tight">تحليل الصور <br/>واللوحات (Vision)</h3>
             <p className="opacity-50 text-sm mb-6 leading-relaxed">التقط صوراً للوحات الطرق والمحلات ليقوم التطبيق بتفسيرها.</p>
             <div className="flex items-center gap-3 text-emerald-500 font-black">مسح صورة <ArrowRight size={20}/></div>
          </div>

        </div>

        {/* Professional Credits & Team Section */}
        <section className="mt-24">
           <div className="relative p-1 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 rounded-[50px] overflow-hidden shadow-2xl">
              <div className="bg-slate-900 rounded-[48px] p-12 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 blur-[120px] -ml-32 -mt-32"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 blur-[120px] -mr-32 -mb-32"></div>
                 </div>
                 
                 <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                      <div className="p-5 bg-white/5 rounded-full border border-white/10 animate-bounce">
                        <Heart size={48} className="text-red-500 fill-red-500" />
                      </div>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2">فريق العمل المبدع</h2>
                    <p className="text-slate-400 mb-10 text-lg">هذا المشروع هو ثمرة جهود مشتركة لتغيير حياة الملايين</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                       {["فوزيه السيد", "خوله الغامدي", "مريان رصرص", "سميه فخرو", "فرح نور الدين"].map((name) => (
                         <div key={name} className="group p-6 bg-white/5 rounded-[30px] border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-default">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-blue-400 font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                               {name[0]}
                            </div>
                            <p className="text-white font-bold text-sm">{name}</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">مطور المشروع</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* --- Super Interactive Modals --- */}
      {activeFeature && (
        <div className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className={`${theme.card} w-full max-w-4xl rounded-[60px] shadow-2xl overflow-hidden relative animate-[modalIn_0.4s_cubic-bezier(0.16,1,0.3,1)]`}>
             
             <button 
                onClick={() => {setActiveFeature(null); setPrediction(""); setIsProcessing(false);}}
                className="absolute top-8 left-8 p-4 bg-slate-100 rounded-full text-slate-800 hover:bg-red-500 hover:text-white transition-all z-20"
             >✕</button>

             <div className="flex flex-col md:flex-row h-full">
                
                {/* Visual Interface */}
                <div className="w-full md:w-2/3 p-4">
                  <div className="aspect-video bg-black rounded-[45px] relative overflow-hidden border-4 border-white/5">
                     {activeFeature === 1 && (
                       <>
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                        <div className="absolute inset-0 border-[20px] border-blue-500/20 pointer-events-none"></div>
                        <div className="absolute top-6 right-6 flex items-center gap-3 bg-red-600 px-5 py-2 rounded-full text-white text-[10px] font-black tracking-tighter">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> معالجة عصبية حية
                        </div>
                        {isProcessing && (
                          <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-md flex flex-col items-center justify-center">
                             <div className="w-24 h-24 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
                             <p className="text-white font-black mt-6 tracking-widest animate-pulse uppercase">تحليل حركة اليدين...</p>
                          </div>
                        )}
                        {prediction && (
                           <div className="absolute bottom-10 left-10 right-10 bg-white p-8 rounded-[35px] shadow-2xl border-4 border-blue-400 animate-[slideUp_0.5s_ease-out]">
                              <div className="flex items-center gap-6">
                                <div className="p-4 bg-blue-100 rounded-2xl text-blue-600 animate-bounce"><Volume2 size={40}/></div>
                                <div>
                                   <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">الترجمة الصوتية</p>
                                   <p className="text-3xl font-black text-blue-900 leading-tight">{prediction}</p>
                                </div>
                              </div>
                           </div>
                        )}
                       </>
                     )}

                     {activeFeature === 2 && (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-950">
                           <div className="relative text-center">
                              <div className="text-[12rem] animate-[float_4s_easeInOut_infinite]">👧🏻</div>
                              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-8 py-3 rounded-full border border-white/20 text-white font-black">
                                 {inputText || "تحدث ليتم التمثيل..."}
                              </div>
                           </div>
                        </div>
                     )}

                     {activeFeature === 3 && (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
                           <div className={`w-80 h-80 rounded-full border-[20px] flex items-center justify-center transition-all duration-300 ${emergencyAlert ? 'bg-red-600 border-red-400 shadow-[0_0_100px_rgba(239,68,68,0.6)]' : 'bg-blue-600 border-blue-400 shadow-[0_0_60px_rgba(37,99,235,0.3)]'}`}>
                              <Bell size={120} className={`text-white ${emergencyAlert ? 'animate-bounce' : 'animate-pulse'}`} />
                           </div>
                           <div className="absolute inset-0 border-t-4 border-white/5 animate-spin-slow rounded-full scale-150"></div>
                        </div>
                     )}

                     {activeFeature === 4 && (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950 p-12 text-white">
                           <div className="w-full h-full border-4 border-dashed border-emerald-500/30 rounded-[40px] flex flex-col items-center justify-center group hover:bg-emerald-900 transition-all cursor-pointer">
                              <ImageIcon size={100} className="text-emerald-500/50 mb-6 group-hover:scale-110 transition-transform" />
                              <h4 className="text-2xl font-black">ارفع صورة اللوحة</h4>
                              <p className="opacity-40 text-sm mt-2">نظام Vision سيقوم بتحليل النص فوراً</p>
                           </div>
                        </div>
                     )}
                  </div>
                </div>

                {/* Control Panel */}
                <div className="w-full md:w-1/3 p-10 flex flex-col justify-center gap-8">
                   {activeFeature === 1 && (
                     <>
                       <h2 className="text-4xl font-black leading-tight">الترجمة البصرية <br/><span className="text-blue-500">مباشر</span></h2>
                       <button 
                        onClick={toggleCamera}
                        className={`w-full py-6 rounded-3xl font-black text-xl shadow-xl transition-all ${cameraStream ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}
                       >
                         {cameraStream ? 'إيقاف الكاميرا' : 'تفعيل الكاميرا'}
                       </button>
                       <button 
                        disabled={!cameraStream}
                        onClick={processSignLanguage}
                        className="w-full py-6 bg-blue-500 text-white rounded-3xl font-black text-xl shadow-xl shadow-blue-500/30 active:scale-95 disabled:opacity-30"
                       >
                         {isProcessing ? 'جارٍ الترجمة...' : 'ترجمة الحركة'}
                       </button>
                     </>
                   )}

                   {activeFeature === 2 && (
                     <>
                       <h2 className="text-4xl font-black text-purple-600">الأفاتار المساعد</h2>
                       <div className="relative">
                          <textarea 
                            className="w-full bg-slate-50 border-2 border-purple-100 rounded-[30px] p-6 text-xl text-right outline-none focus:border-purple-500 transition-all min-h-[150px]"
                            placeholder="اكتب هنا ليتم تحويلها لإشارة..."
                            onChange={(e) => setInputText(e.target.value)}
                          />
                          <button className="absolute bottom-4 left-4 p-4 bg-purple-500 text-white rounded-2xl shadow-lg"><Mic size={24}/></button>
                       </div>
                       <button className="w-full py-6 bg-purple-500 text-white rounded-3xl font-black text-xl shadow-xl shadow-purple-500/30">تحويل فوري</button>
                     </>
                   )}

                   {activeFeature === 3 && (
                     <>
                       <h2 className="text-4xl font-black text-red-600 leading-tight">محاكي <br/>الرادار</h2>
                       <p className="opacity-50 text-sm font-bold">هذه الميزة تعمل في الخلفية وتقوم بتنبيهك عند حدوث أصوات غير طبيعية.</p>
                       <button 
                        onClick={triggerEmergency}
                        className="w-full py-8 bg-red-600 text-white rounded-3xl font-black text-2xl shadow-2xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all"
                       >
                         <AlertTriangle size={32} /> تجربة الطوارئ
                       </button>
                       <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                          <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">الأجهزة المتصلة</p>
                          <div className="flex items-center gap-2 text-green-600 font-bold"><Smartphone size={16}/> ساعة Apple Watch مفعلة</div>
                       </div>
                     </>
                   )}

                   {activeFeature === 4 && (
                     <>
                       <h2 className="text-4xl font-black text-emerald-600 leading-tight">معالج <br/>الصور</h2>
                       <div className="space-y-4">
                          <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
                             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><Eye /></div>
                             <p className="text-xs font-bold text-emerald-800">تحليل النصوص OCRv2</p>
                          </div>
                          <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
                             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><Zap /></div>
                             <p className="text-xs font-bold text-emerald-800">ترجمة لغة إشارة فورية</p>
                          </div>
                       </div>
                       <button className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-emerald-500/30 mt-4">مسح ضوئي جديد</button>
                     </>
                   )}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* --- Global Styles for Animations --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        
        body { font-family: 'Cairo', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;