"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import fetchProfile from "@/actions/fetchProfile";
import { addProfile } from "@/actions/addProfile";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "@/actions/updateProfile";
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
    const [userID, setUserID] = useState("");
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState<Omit<Profile, "id"> | null>(null);
    const navigator = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserID(user.uid);
                const fetchedProfile = await fetchProfile(user.uid);
                setProfile(fetchedProfile);
                setEditProfile(fetchedProfile ? { ...fetchedProfile } : null);
            } else {
                setUserID("");
                navigator.push("/login");
            }
        });
    }, [navigator]);

    const handleSaveProfile = async () => {
        if (userID && editProfile) {
            const success = await updateProfile(userID, editProfile);
            if (success) {
                const updatedProfile = await fetchProfile(userID);
                setProfile(updatedProfile);
                setEditProfile(updatedProfile);
                setIsEditing(false);
                alert("Profile updated successfully!");
            }
        }
    };

    const addBankDetail = () => {
        setEditProfile((prev) => prev ? { ...prev, bank: [...prev.bank, { upi: "", bankname: "", accountnumber: "", ifsc: "" }] } : null);
    };

    const removeBankDetail = (index: number) => {
        setEditProfile((prev) => prev ? { ...prev, bank: prev.bank.filter((_, i) => i !== index) } : null);
    };

    const updateBankDetail = (index: number, field: keyof BankDetails, value: string) => {
        setEditProfile((prev) => prev ? {
            ...prev,
            bank: prev.bank.map((bank, i) => i === index ? { ...bank, [field]: value } : bank),
        } : null);
    };

    return (
        <div className="pt-28">
            <Card className="container mx-auto px-4 py-8 max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">
                        {isEditing ? "Edit Profile" : "Profile"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isEditing && editProfile ? (
                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <h2 className="text-xl font-semibold">Personal Details</h2>
                            <ProfileInput label="Name" value={editProfile.name} onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })} />
                            <ProfileInput label="Email" type="email" value={editProfile.email} onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })} />
                            <ProfileInput label="Phone" type="tel" value={editProfile.phone} onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })} />
                            <ProfileInput label="Address" value={editProfile.address} onChange={(e) => setEditProfile({ ...editProfile, address: e.target.value })} />
							<h2 className="text-xl font-semibold">Bank Details</h2>
							<ol className="list-decimal list-inside">
								{editProfile.bank.map((bank, index) => (
									<li key={index} className="border p-4 rounded mb-4">
										<ProfileInput label="UPI" value={bank.upi} onChange={(e) => updateBankDetail(index, "upi", e.target.value)} />
										<ProfileInput label="Bank Name" value={bank.bankname} onChange={(e) => updateBankDetail(index, "bankname", e.target.value)} />
										<ProfileInput label="Account Number" value={bank.accountnumber} onChange={(e) => updateBankDetail(index, "accountnumber", e.target.value)} />
										<ProfileInput label="IFSC" value={bank.ifsc} onChange={(e) => updateBankDetail(index, "ifsc", e.target.value)} />
										<Button variant="destructive" onClick={() => removeBankDetail(index)} className="mt-2"> Remove Bank Detail </Button>
									</li>
								))}
							</ol>
                            <Button onClick={addBankDetail} className="w-full mb-4"> Add Another Bank Detail </Button>
                            <Button onClick={handleSaveProfile} type="submit" className="w-full"> Save Changes </Button>
                        </form>
                    ) : profile ? (
                        <div className="space-y-4">
                            <ProfileField label="Name" value={profile.name} />
                            <ProfileField label="Email" value={profile.email} />
                            <ProfileField label="Phone" value={profile.phone} />
                            <ProfileField label="Address" value={profile.address} />
							<h2 className="text-xl font-semibold mt-6 mb-4">Bank Details</h2>
                            <ol className="list-decimal list-inside">
                                {profile.bank.map((bank, index) => (
                                    <li key={index} className="space-y-4 mb-4">
                                        <span>Account {index+1}</span>
                                        <div className="flex gap-8 ml-8">
                                            {bank.upi && <ProfileField label="UPI" value={bank.upi} />}
                                            {bank.bankname && <ProfileField label="Bank Name" value={bank.bankname} />}
                                            {bank.accountnumber && <ProfileField label="Account Number" value={bank.accountnumber} />}
                                            {bank.ifsc && <ProfileField label="IFSC" value={bank.ifsc} />}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <Button onClick={() => setIsEditing(true)} className="w-full"> Edit Profile </Button>
                        </div>
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function ProfileField({ label, value }: { label: string; value: string; }) {
    return (
        <div>
            <Label className="font-medium text-muted-foreground">{label}</Label>
            <p className="mt-1">{value}</p>
        </div>
    );
}

function ProfileInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; }) {
    return (
        <div>
            <Label htmlFor={label.toLowerCase()} className="font-medium"> {label} </Label>
            <Input type={type} id={label.toLowerCase()} placeholder={`Enter your ${label.toLowerCase()}`} value={value} onChange={onChange} className="mt-1" />
        </div>
    );
}
