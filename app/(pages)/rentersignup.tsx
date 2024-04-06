import React from 'react';
import { Text, View, TextInput, Switch, Button, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { iPerson } from '../components/interfaces';
import { useEffect, useState } from 'react';

const rentersignup = () => {
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

  const onSubmit = (data) => console.log(data);

  return (
    <View contentContainerStyle={{ padding: 16 }}>
      <Controller
        control={control}
        name="first_name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput placeholder="First Name" value={value} onChangeText={onChange} />
            {errors.first_name && <Text style={{ color: 'red' }}>{errors.first_name.message}</Text>}
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
            {errors.last_name && <Text style={{ color: 'red' }}>{errors.last_name.message}</Text>}
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
  );
};

export default rentersignup;
