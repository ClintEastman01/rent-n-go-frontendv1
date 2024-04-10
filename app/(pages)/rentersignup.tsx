import React from 'react';
import { Text, View, TextInput } from 'react-native';
import SignInWithOAuth from '../components/SignInWithOAuth';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { useForm, Controller } from 'react-hook-form';
import { iCreatedPersonResponse, iPerson } from '../components/interfaces';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/Button';

const rentersignup = () => {
  const { getToken } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<iPerson>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      phone: '',
      is_partner: false,
      photos_of_docs: [],
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: iPerson) => {
    console.log(data);
    try {
      const fetchedToken = await getToken({ template: 'oneWeek' });
      const r = await fetch('https://e6e8-68-193-89-107.ngrok-free.app/data/create/person', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${fetchedToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = (await r.json()) as unknown as iCreatedPersonResponse;
      if (res.status !== 201) {
        console.log(res.error);
      }
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center ">
      <SignedOut>
        <SignInWithOAuth />
      </SignedOut>
      <SignedIn>
        <View className="h-full w-full flex-1 items-center justify-center gap-8  bg-myTheme-lightbg pb-20">
          <View className="flex w-full items-center justify-start">
            <Text className="pb-6 text-center text-3xl font-bold text-myTheme-darktext">
              Create New Renter Account
            </Text>
          </View>
          <View className="flex w-full flex-row gap-2 px-4 ">
            <View className="w-1/2">
              <Controller
                control={control}
                name="first_name"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="w-full ">
                    <TextInput
                      placeholder="First Name"
                      value={value}
                      onChangeText={onChange}
                      className="flex h-[50] w-full rounded-xl border-b-2 border-gray-200 bg-white p-2 text-myTheme-darktext shadow-sm"
                    />
                    {errors.first_name && (
                      <Text style={{ color: 'red' }}>First Name is required</Text>
                    )}
                  </View>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="last_name"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="w-full">
                    <TextInput
                      placeholder="Last Name"
                      value={value}
                      onChangeText={onChange}
                      className="flex h-[50] w-full rounded-xl border-b-2 border-gray-200 bg-white  p-2 text-myTheme-darktext shadow-sm"
                    />
                    {errors.last_name && (
                      <Text style={{ color: 'red' }}>Last Name is required</Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
          <View className="flex w-full gap-8">
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className="w-full px-4">
                  <TextInput
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    className="flex h-[50] w-full rounded-xl border-b-2 border-gray-200 bg-white p-2 text-myTheme-darktext shadow-sm"
                  />
                  {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name="address"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className="w-full px-4">
                  <TextInput
                    placeholder="Address"
                    value={value}
                    onChangeText={onChange}
                    className="flex h-[50] w-full rounded-xl border-b-2 border-gray-200 bg-white p-2 text-myTheme-darktext shadow-sm"
                  />
                  {errors.address && <Text style={{ color: 'red' }}>Address is required</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className="w-full px-4">
                  <TextInput
                    placeholder="Phone"
                    border-gray-200
                    shadow-sm
                    border-b-2
                    value={value}
                    onChangeText={onChange}
                    className="flex h-[50] w-full rounded-xl border-b-2 border-gray-200 bg-white p-2 text-myTheme-darktext shadow-sm"
                  />
                  {errors.phone && <Text style={{ color: 'red' }}>Phone Number is required</Text>}
                </View>
              )}
            />
          </View>
          <View className="w-full px-4">
            <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SignedIn>
    </View>
  );
};

export default rentersignup;
