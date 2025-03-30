import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from '@/context/context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Error from './error';
import { Card } from './ui/card';
import * as yup from 'yup'
import { QRCode } from 'react-qrcode-logo';
import useFetch from '@/hooks/use-fetch';
import { createUrl } from '@/db/apiUrl';
import { HashLoader } from 'react-spinners';

const CreateLink = () => {
    const { user } = UrlState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    let [searchParams] = useSearchParams();
    const ref = useRef();
    const longLink = searchParams.get('createNew');

    const [formValues, setFormValues] = useState({
        title: '',
        longUrl: longLink || '',
        customUrl: '',
    });

    const { data, loading, error, fn: fnCreateUrl } = useFetch(createUrl, { ...formValues, user_id: user.id });

    const schema = yup.object().shape({
        title: yup.string().required('Title is Required'),
        longUrl: yup.string().url("Must be a valid URL").required('Long URL is required'),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        if (error === null && data?.[0]?.id) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data, navigate]);

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });
            
            
            const canvas = ref.current?.canvasRef?.current;
            if (!canvas) {
                throw new Error("QR Code rendering failed.");
            }

            const blob = await new Promise((resolve) => canvas.toBlob(resolve));
            await fnCreateUrl(blob);
        } catch (e) {
            if (e?.inner) {
                const newErrors = {};
                e.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <div>   
            <Dialog>
                <DialogTrigger asChild><Button>Create New</Button></DialogTrigger>
                <DialogContent className='sm:max-w-md gap-2'>
                    <DialogHeader>
                        <DialogTitle className='mb-6'>Create New Link</DialogTitle>
                    </DialogHeader>
                    {formValues.longUrl && <QRCode value={formValues.longUrl} size={250} ref={ref} />}

                    <Input id='title' value={formValues.title} onChange={handleChange} placeholder="Short Link's Title" />
                    {errors.title && <Error message={errors.title} />}

                    <Input id='longUrl' value={formValues.longUrl} onChange={handleChange} placeholder="Enter your Long URL" />
                    {errors.longUrl && <Error message={errors.longUrl} />}

                    <div className='flex items-center gap-2'>
                        <Card className='p-2'>linkleap.in</Card> /
                        <Input id='customUrl' value={formValues.customUrl} onChange={handleChange} placeholder="Custom Link (Optional)" />
                    </div>
                    {error && <Error message={error.message} />}

                    <DialogFooter>
                        <div className='flex justify-between w-full'>
                            <Button className='px-8' variant='outline' type="button">Cancel</Button>
                            <Button disabled={loading} onClick={createNewLink}>
                                {loading ? <span className='text-md flex gap-3 items-center'><HashLoader size={17} /> Creating...</span> : "Create"}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateLink;
