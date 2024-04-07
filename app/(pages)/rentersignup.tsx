import React from 'react';
import { Text, View, TextInput, Switch, Button, ScrollView } from 'react-native';
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
    resolver: async (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.first_name) errors.first_name = 'First name is required';
      if (!values.last_name) errors.last_name = 'Last name is required';
      if (!values.email) errors.email = 'Email is required';
      if (!values.address) errors.address = 'Address is required';
      if (!values.phone) errors.phone = 'Phone is required';
      return { values, errors };
    },
  });

  const onSubmit = async (data: iPerson) => {
    console.log(data);
    try {
      const fetchedToken = await getToken({ template: 'oneWeek' });
      const r = await fetch('https://df75-68-193-89-107.ngrok-free.app/data/create/person', {
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
    <View className="flex-1 justify-center items-center ">
      <SignedOut >
        <SignInWithOAuth />
      </SignedOut>
      <SignedIn>
        <View className="flex-1 w-full gap-8 h-full justify-center items-center  bg-myTheme-lightbg pb-20">
          <View className='w-full flex justify-start items-center'>
            <Text className='text-3xl pb-6 text-center font-bold text-myTheme-darktext'>Create New Account</Text>
          </View>
          <View className='w-full flex flex-row px-4 gap-2 '>
            <View className='w-1/2'>
              <Controller
                control={control}
                name="first_name"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className='w-full '>
                    <TextInput placeholder="First Name" value={value} onChangeText={onChange}
                      className='flex w-full h-[50] border-gray-200 shadow-sm border-b-2 rounded-xl bg-white p-2 text-myTheme-darktext'
                    />
                    {errors.first_name && (
                      <Text style={{ color: 'red' }}>{errors.last_name?.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>
            <View className='flex-1'>
              <Controller
                control={control}
                name="last_name"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className='w-full'>
                    <TextInput placeholder="Last Name" value={value} onChangeText={onChange}
                      className='flex w-full h-[50] border-gray-200 shadow-sm border-b-2 rounded-xl  bg-white p-2 text-myTheme-darktext' />
                    {errors.last_name && (
                      <Text style={{ color: 'red' }}>{errors.last_name.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

          </View>
          <View className='w-full flex gap-8'>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className='w-full px-4'>
                  <TextInput placeholder="Email" value={value} onChangeText={onChange}
                    className='flex w-full h-[50] rounded-xl border-gray-200 shadow-sm border-b-2 bg-white p-2 text-myTheme-darktext' />
                  {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name="address"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className='w-full px-4'>
                  <TextInput placeholder="Address" value={value} onChangeText={onChange}
                    className='flex w-full h-[50] border-gray-200 shadow-sm border-b-2 rounded-xl bg-white p-2 text-myTheme-darktext' />
                  {errors.address && <Text style={{ color: 'red' }}>{errors.address.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className='w-full px-4'>
                  <TextInput placeholder="Phone" border-gray-200 shadow-sm border-b-2 value={value} onChangeText={onChange}
                    className='flex w-full h-[50] border-gray-200 shadow-sm border-b-2 rounded-xl bg-white p-2 text-myTheme-darktext' />
                  {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
                </View>
              )}
            />
          </View>
          <View className='w-full px-4'>
            <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SignedIn>
    </View>
  );
};

export default rentersignup;
