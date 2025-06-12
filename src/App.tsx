// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to OC Page</h1>
//     </div>
//   )
// }

// export default App 

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

/**
 * RoleCreationFormMobile (重排版) — 水蜜桃粉主题 · 窄屏优化
 * 更新：2025‑07‑02
 * 说明：按"角色基本设定 / 角色补充设定 / 角色语言习惯"三大分区重新排布原有输入项，其余交互与样式保持一致。
 */
export default function RoleCreationFormMobileRearranged() {
  type Steps = 'basic' | 'supplement' | 'language';
  const [step, setStep] = useState<Steps>('basic');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    /* 基本 */
    avatar: null as File | null,
    voice: null as File | null,
    language: '',
    name: '',
    gender: '男',
    otherGender: '',
    age: '',
    birthday: '',
    mbti: '',
    bloodType: '',
    stance: '',
    /* 核心必填 */
    appearance: '',
    personality: '',
    identity: '',
    /* 高级 */
    supplemental: '',
    world: '',
    userRelation: '',
    /* 语言习惯 */
    addressUser: '', // 如何称呼用户
    greeting: '',
    catchphrase: '',
    examples: [''] as string[],
  });
  const MBTI = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
  const update = (k: keyof typeof form, v: any) => setForm(p => ({ ...p, [k]: v }));
  const updateExample = (i: number, v: string) => {
    const a = [...form.examples];
    a[i] = v;
    update('examples', a);
  };
  const addExample = () => form.examples.length < 3 && update('examples', [...form.examples, '']);

  // 添加事件处理函数类型
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('avatar', e.target.files?.[0] || null);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('voice', e.target.files?.[0] || null);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update('language', e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('name', e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('gender', e.target.value);
  };

  const handleOtherGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('otherGender', e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('age', e.target.value);
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('birthday', e.target.value);
  };

  const handleMbtiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update('mbti', e.target.value);
  };

  const handleBloodTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update('bloodType', e.target.value);
  };

  const handleStanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('stance', e.target.value);
  };

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update('appearance', e.target.value);
  };

  const handlePersonalityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update('personality', e.target.value);
  };

  const handleIdentityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update('identity', e.target.value);
  };

  const handleSupplementalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update('supplemental', e.target.value);
  };

  const handleWorldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update('world', e.target.value);
  };

  const handleUserRelationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update('userRelation', e.target.value);
  };

  const handleAddressUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('addressUser', e.target.value);
  };

  const handleGreetingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('greeting', e.target.value);
  };

  const handleCatchphraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update('catchphrase', e.target.value);
  };

  const handleExampleChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateExample(i, e.target.value);
  };

  useEffect(() => {
    if (!form.avatar) {
      setAvatarUrl(null);
      return;
    }
    const u = URL.createObjectURL(form.avatar);
    setAvatarUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [form.avatar]);

  /* 必填字段检查 —— 与旧版保持一致 */
  const requiredFilled = Boolean(
    form.avatar &&
      form.language &&
      form.name &&
      form.appearance &&
      form.personality &&
      form.identity,
  );

  /* 通用样式封装 */
  const inputCls = 'w-full border rounded focus:ring-pink-400 focus:border-pink-400 placeholder:text-pink-300 text-sm';
  const FullInput = (p: any) => <Input {...p} className={inputCls} />;
  const FullTextarea = (p: any) => <Textarea {...p} className={inputCls} />;
  const PinkBtn = (p: any) => <Button {...p} className={'bg-pink-400 hover:bg-pink-500 active:bg-pink-600 text-white ' + (p.className || '')} />;

  /* === 分区组件 === */

  /** 角色基本设定 → 原【基础信息】+ 核心必填三项 */
  const BasicSetting = () => (
    <div className="space-y-6 pb-6">
      {/* Avatar */}
      <div className="flex flex-col items-start">
        <Label className="mb-1">角色头像 <span className="text-pink-400">*</span></Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {avatarUrl && <img src={avatarUrl} className="mt-3 rounded-full border object-cover" style={{ width: '50vw', maxWidth: 140, height: '50vw', maxHeight: 140 }} />}
      </div>

      {/* Language */}
      <div>
        <Label className="mb-1 block">角色常用语言 <span className="text-pink-400">*</span></Label>
        <select value={form.language} onChange={handleLanguageChange} className="w-full p-2 border rounded bg-white focus:ring-pink-400 focus:border-pink-400 text-sm">
          <option value="">请选择语言</option>
          {['中文', '英文', '日语', '其他'].map(l => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Voice */}
      <div className="flex flex-col">
        <Label className="mb-1">角色语音 (≤15s)</Label>
        <Input type="file" accept="audio/mp3,audio/wav" onChange={handleVoiceChange} />
        <span className="text-xs text-gray-400 mt-1">支持 MP3/WAV，时长 ≤15 秒</span>
      </div>

      {/* Name */}
      <div>
        <Label>角色名称 <span className="text-pink-400">*</span></Label>
        <FullInput value={form.name} onChange={handleNameChange} placeholder="角色名称" />
      </div>

      {/* Gender */}
      <div>
        <Label>性别 <span className="text-pink-400">*</span></Label>
        <div className="flex gap-2 mt-1 flex-wrap">
          {['男', '女', '其他'].map(g => (
            <PinkBtn key={g} size="sm" variant={form.gender === g ? 'default' : 'outline'} className={form.gender === g ? '' : 'bg-white text-pink-400 border-pink-400'} onClick={() => handleGenderChange(g)}>
              {g}
            </PinkBtn>
          ))}
        </div>
        {form.gender === '其他' && <FullInput className="mt-2" value={form.otherGender} onChange={handleOtherGenderChange} placeholder="自定义性别" />}
      </div>

      {/* Age & Birthday */}
      <div className="flex flex-col gap-2">
        <div>
          <Label>年龄</Label>
          <FullInput value={form.age} onChange={handleAgeChange} />
        </div>
        <div>
          <Label>生日</Label>
          <FullInput type="date" value={form.birthday} onChange={handleBirthdayChange} />
        </div>
      </div>

      {/* MBTI & BloodType */}
      <div className="flex flex-col gap-2">
        <div>
          <Label>MBTI</Label>
          <select value={form.mbti} onChange={handleMbtiChange} className="w-full p-2 border rounded bg-white focus:ring-pink-400 focus:border-pink-400 text-sm">
            <option value="">选择 MBTI</option>
            {MBTI.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>血型</Label>
          <select value={form.bloodType} onChange={handleBloodTypeChange} className="w-full p-2 border rounded bg-white focus:ring-pink-400 focus:border-pink-400 text-sm">
            <option value="">选择</option>
            {['A', 'B', 'AB', 'O', '其他'].map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stance */}
      <div>
        <Label>立场</Label>
        <FullInput value={form.stance} onChange={handleStanceChange} placeholder="例如：混沌中立 / 守序善良" />
      </div>

      {/* === 核心必填：外貌 / 性格 / 身份 === */}
      <div className="space-y-4 pt-4 border-t border-dashed border-pink-200">
        <div>
          <Label>外貌 <span className="text-pink-400">*</span></Label>
          <FullTextarea rows={4} value={form.appearance} onChange={handleAppearanceChange} placeholder="身高体型、发型发色、瞳色…" />
        </div>
        <div>
          <Label>性格 <span className="text-pink-400">*</span></Label>
          <FullTextarea rows={4} value={form.personality} onChange={handlePersonalityChange} placeholder="性格、优缺点、兴趣爱好…" />
        </div>
        <div>
          <Label>身份 <span className="text-pink-400">*</span></Label>
          <FullTextarea rows={4} value={form.identity} onChange={handleIdentityChange} placeholder="种族、职业、阶层…" />
        </div>
      </div>
    </div>
  );

  /** 角色补充设定 → 原【高级设定】中的私有设定 / 与用户的关系 / 世界观 */
  const SupplementSetting = () => (
    <div className="space-y-6 pb-6">
      <div>
        <Label>补充设定</Label>
        <FullTextarea rows={4} value={form.supplemental} onChange={handleSupplementalChange} placeholder="角色经历、生活习惯…" />
      </div>
      <div>
        <Label>与用户的关系</Label>
        <FullInput value={form.userRelation} onChange={handleUserRelationChange} placeholder="如：挚友 / 上下级 / 主仆…" />
      </div>
      <div>
        <Label>世界观</Label>
        <FullTextarea rows={4} value={form.world} onChange={handleWorldChange} placeholder="时代背景、文化冲突…" />
      </div>
    </div>
  );

  /** 角色语言习惯 → addressUser / greeting / catchphrase / examples */
  const LanguageHabit = () => (
    <div className="space-y-6 pb-6">
      <div>
        <Label>如何称呼用户</Label>
        <FullInput value={form.addressUser} onChange={handleAddressUserChange} placeholder="如：主人 / 挚友 / 阁下…" />
      </div>
      <div>
        <Label>开场白</Label>
        <FullInput value={form.greeting} onChange={handleGreetingChange} placeholder="角色见面时的第一句问候" />
      </div>
      <div>
        <Label>口癖</Label>
        <FullInput value={form.catchphrase} onChange={handleCatchphraseChange} placeholder="角色常挂在嘴边的话" />
      </div>
      <div className="space-y-2">
        <Label>【示例对话】</Label>
        <p className="text-xs text-gray-400">可用作角色说话风格参考的代表性话语或台词摘录，不超过三条</p>
        {form.examples.map((ex, i) => (
          <FullInput key={i} value={ex} onChange={handleExampleChange(i)} placeholder={`示例 ${i + 1}`} />
        ))}
        {form.examples.length < 3 && (
          <PinkBtn variant="outline" size="sm" className="bg-white text-pink-400 border-pink-400" onClick={addExample}>
            + 添加
          </PinkBtn>
        )}
      </div>
    </div>
  );

  /** 保存逻辑：沿用旧版 */
  const handleSave = () => {
    if (!requiredFilled) {
      alert('请补全必填项');
      return;
    }
    alert('保存成功(示例)');
  };

  const stepIdx = { basic: 1, supplement: 2, language: 3 }[step];

  return (
    <div className="max-w-xs mx-auto p-3 space-y-3 text-sm">
      {/* 顶部进度 + 保存 */}
      <div className="flex justify-between items-center">
        <span className="text-pink-400">步骤 {stepIdx} / 3</span>
        <PinkBtn size="sm" disabled={!requiredFilled} onClick={handleSave} className={requiredFilled ? '' : 'opacity-50 pointer-events-none'}>
          保存
        </PinkBtn>
      </div>

      {/* Tabs */}
      <Tabs value={step} onValueChange={v => setStep(v as Steps)} className="space-y-3">
        <TabsList className="overflow-x-auto whitespace-nowrap border-b border-pink-200">
          <TabsTrigger value="basic" className="px-4 py-1 text-pink-400 data-[state=active]:bg-pink-400 data-[state=active]:text-white">角色基本设定</TabsTrigger>
          <TabsTrigger value="supplement" className="px-4 py-1 text-pink-400 data-[state=active]:bg-pink-400 data-[state=active]:text-white">角色补充设定</TabsTrigger>
          <TabsTrigger value="language" className="px-4 py-1 text-pink-400 data-[state=active]:bg-pink-400 data-[state=active]:text-white">角色语言习惯</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <BasicSetting />
        </TabsContent>
        <TabsContent value="supplement">
          <SupplementSetting />
        </TabsContent>
        <TabsContent value="language">
          <LanguageHabit />
        </TabsContent>
      </Tabs>
    </div>
  );
}
