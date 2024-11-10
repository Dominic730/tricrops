"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from '@/lib/firebase/firebase';
import { Button } from "@/components/ui/button";
import fetchProfile from '@/actions/fetchProfile';
import { addProfile } from '@/actions/addProfile';
import { onAuthStateChanged } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BankDetails {
  upi: string;
  bankname: string;
  accountnumber: string;
  ifsc: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bank: BankDetails[];
}

export default function Page() {
  const [userID, setUserID] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    bank: [{ upi: '', bankname: '', accountnumber: '', ifsc: '' },]
  });
  const navigator = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserID(user.uid);
        const fetchedProfile = await fetchProfile(user.uid);
        setProfile(fetchedProfile);
        console.log(fetchedProfile);
      } else {
        setUserID('');
        navigator.push('/login');
      }
    });
  }, [navigator]);

  const handleAddProfile = async () => {
    if (userID) {
      const success = await addProfile(userID, newProfile);
      if (success) {
        const updatedProfile = await fetchProfile(userID);
        setProfile(updatedProfile);
        alert('Profile added successfully!');
      }
    }
  };

  const addBankDetail = () => {
    setNewProfile(prev => ({
      ...prev,
      bank: [{ upi: '', bankname: '', accountnumber: '', ifsc: '' }]
    }));
  };

  const removeBankDetail = (index: number) => {
    setNewProfile(prev => ({
      ...prev,
      bank: prev.bank.filter((_, i) => i !== index)
    }));
  };

  const updateBankDetail = (index: number, field: keyof BankDetails, value: string) => {
    setNewProfile(prev => ({
      ...prev,
      bank: prev.bank.map((bank, i) => i === index ? { ...bank, [field]: value } : bank)
    }));
  };

  return (
    <div className="pt-28">
      <Card className="container mx-auto px-4 py-8 max-w-2xl">
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center'>{profile ? 'Profile' : 'Add Profile'}</CardTitle>
        </CardHeader>
        <CardContent>
          {profile ? (
            <div className="space-y-4">
              <ProfileField label="Name" value={profile.name} />
              <ProfileField label="Email" value={profile.email} />
              <ProfileField label="Phone" value={profile.phone} />
              <ProfileField label="Address" value={profile.address} />
              <h2 className="text-xl font-semibold mt-6 mb-4">Bank Details</h2>
              {profile.bank.map((bank, index) => (
                <div key={index} className="space-y-4 mb-4">
                  <ProfileField label="UPI" value={bank.upi} />
                  <ProfileField label="Bank Name" value={bank.bankname} />
                  <ProfileField label="Account Number" value={bank.accountnumber} />
                  <ProfileField label="IFSC" value={bank.ifsc} />
                </div>
              ))}
            </div>
          ) : (
            <form className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Personal Details</h2>
              <ProfileInput label="Name" value={newProfile.name} onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} />
              <ProfileInput label="Email" type="email" value={newProfile.email} onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })} />
              <ProfileInput label="Phone" type="tel" value={newProfile.phone} onChange={(e) => setNewProfile({ ...newProfile, phone: e.target.value })} />
              <ProfileInput label="Address" value={newProfile.address} onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })} />
              <h2 className="text-xl font-semibold">Bank Details</h2>
              {newProfile.bank.map((bank, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <ProfileInput label="UPI" value={bank.upi} onChange={(e) => updateBankDetail(index, 'upi', e.target.value)} />
                  <ProfileInput label="Bank Name" value={bank.bankname} onChange={(e) => updateBankDetail(index, 'bankname', e.target.value)} />
                  <ProfileInput label="Account Number" value={bank.accountnumber} onChange={(e) => updateBankDetail(index, 'accountnumber', e.target.value)} />
                  <ProfileInput label="IFSC" value={bank.ifsc} onChange={(e) => updateBankDetail(index, 'ifsc', e.target.value)} />
                  <Button variant="destructive" onClick={() => removeBankDetail(index)} className="mt-2">Remove Bank Detail</Button>
                </div>
              ))}
              <Button onClick={addBankDetail} className="w-full mb-4">Add Another Bank Detail</Button>
              <Button onClick={(e) => { e.preventDefault(); handleAddProfile(); }} type="submit" className="w-full">Save Profile</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="font-medium text-muted-foreground">{label}</Label>
      <p className="mt-1">{value}</p>
    </div>
  )
}

function ProfileInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <div>
      <Label htmlFor={label.toLowerCase()} className="font-medium">{label}</Label>
      <Input type={type} id={label.toLowerCase()} placeholder={label} value={value} onChange={onChange} className="mt-1" />
    </div>
  )
}
