import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',  // change in .$id
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [dataSubmiting, setDataSubmiting] = useState(false)

  const submit = async (data) => {
    setDataSubmiting(true)
    try {
      let fileId;
      // if user want to update the existing post.
      if (post) { 
        // If user reupload new image than, upload that image in storage and delete the previous image. 
        if (data.image[0]) {     // if user reupload new image in existing post.
          const file = await service.uploadFile(data.image[0]);
          fileId = file.$id;
          service.deleteFile(post.featuredImage);  // deleting the previous image
        }
        // After uploading new image and deleting previous image, now update the featuredImage with new image ID.
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: fileId || post.featuredImage,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }

        // If user create fresh new post.
      } else {
        // Upload the given image in storage.
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          fileId = file.$id;
          const dbPost = await service.createPost({
            ...data,
            featuredImage: fileId,
            userId: userData.$id,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
    setDataSubmiting(false)
  };

  // This usecallBack function simply convert the given input into slug. 
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
    }
    return '';
  }, []);

  // ==> Watch function allow us to  observe changes to the form's input values. It can watch all fields or specific fields and return their current values.
  // ==> The setValue function allows you to programmatically set the value of a specific field in the form.
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label='Title :'
          placeholder='Title'
          className='mb-4'
          {...register('title', { required: true })}
        />
        <Input
          label='Slug :'
          placeholder='Slug'
          className='mb-4'
          disabled
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label='Content :' name='content' control={control} defaultValue={getValues('content')} />
      </div>
      <div className='w-1/3 px-2'>
        <Input
          label='Featured Image :'
          type='file'
          className='mb-4'
          accept='image/png, image/jpg, image/jpeg, image/gif'
          {...register('image', { required: !post })}
        />
        {post && (
          <div className='w-full mb-4'>
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className='rounded-lg'
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label='Status'
          className='mb-4'
          {...register('status', { required: true })}
        />
        <Button type='submit' bgColor={post ? 'bg-green-500' : undefined} className='w-full bg-blue-400 hover:bg-blue-500'>
          {/* {post ? 'Update' : 'Submit'} */}
          {dataSubmiting ? "Data Procesing..." :  post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
