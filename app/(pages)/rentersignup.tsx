import React from 'react';
import { Text, View, TextInput, Switch, Button, ScrollView } from 'react-native';
import SignInWithOAuth from '../components/SignInWithOAuth';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { useForm, Controller } from 'react-hook-form';
import { iCreatedPersonResponse, iPerson } from '../components/interfaces';
import { useRouter } from 'expo-router';

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
    <>
      <SignedOut>
        <SignInWithOAuth />
      </SignedOut>
      <SignedIn>
        <View>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput placeholder="First Name" value={value} onChangeText={onChange} />
                {errors.first_name && (
                  <Text style={{ color: 'red' }}>{errors.first_name.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="last_name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput placeholder="Last Name" value={value} onChangeText={onChange} />
                {errors.last_name && (
                  <Text style={{ color: 'red' }}>{errors.last_name.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput placeholder="Email" value={value} onChangeText={onChange} />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
              </View>
            )}
          />
          <Controller
            control={control}
            name="address"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput placeholder="Address" value={value} onChangeText={onChange} />
                {errors.address && <Text style={{ color: 'red' }}>{errors.address.message}</Text>}
              </View>
            )}
          />
          <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput placeholder="Phone" value={value} onChangeText={onChange} />
                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
              </View>
            )}
          />
          <Controller
            control={control}
            name="is_partner"
            render={({ field: { value, onChange } }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Switch value={value} onValueChange={onChange} />
                <Text>Is Partner</Text>
              </View>
            )}
          />
          {/* Add functionality for photos_of_docs */}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </SignedIn>
    </>
  );
};

export default rentersignup;
