import { Button, Card, CardBody, Spinner } from '@nextui-org/react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@nextui-org/react";
import useLogin from './useLogin';
import { Controller } from 'react-hook-form';
import { error } from 'console';
import { cn } from '@/utils/cn';

const Login = () => {
    const { 
        isVisible, 
        toggleVisibility, 
        control, 
        handleSubmit, 
        handleLogin, 
        isPendingLogin, 
        errors,
    } = useLogin();

    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image
                src="/images/general/logo.svg"
                alt="Logo"
                width={180}
                height={180}
                />

                <Image
                src="/images/illustrations/login.svg"
                alt="Login"
                className='w-2/3 lg:w-full'
                width={1024}
                height={1024}
                />
            </div>
            <div>
            <Card>
                <CardBody className='p-8'>
                    <h2 className='text-2xl font-bold text-danger-500'>Login</h2>
                    <p className='text-small mb-4 mt-2' >
                         Don{"'"}t have an account?&nbsp;
                    <Link href="/auth/register" className='font-semibold text-danger-400'>Register Here</Link>
                    </p>
                    {errors.root && (
                        <p className='mb-2 font-medium text-danger'>{errors?.root?.message}</p>
                    )}
                    <form className={cn('flex w-80 flex-col gap-4', Object.keys(errors).length > 0 ? "gap-2" : "gap-4",)} 
                    onSubmit={handleSubmit(handleLogin)}>
                        
                        <Controller name="identifier" control={control} render={({field}) => (
                            <Input
                            {...field}
                        type="text"
                        label="Email / Username"
                        variant="bordered"
                        autoComplete="off"
                        isInvalid={errors.identifier !== undefined}
                        errorMessage={errors.identifier?.message}
                        />
                        )}
                        />
                         <Controller name="password" control={control} render={({field}) => (
                            <Input
                            {...field}
                        type={isVisible ? "text" : "password"}
                        label="Password"
                        variant="bordered"
                        autoComplete="off"
                        isInvalid={errors.password !== undefined}
                        errorMessage={errors.password?.message}
                        endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? 
                            (<FaEye className='pointer-events-none text-xl text-default-400' />) : 
                            (<FaEyeSlash className='pointer-events-none text-xl text-default-400' />)}
                        </button>
                        }
                        />
                        )}
                        />
                        
                        <Button color='danger' size='lg' type='submit'>
                            {isPendingLogin? (
                            <Spinner color='white' size="sm"/>
                        ): ""}
                        Login</Button>
                        
                    </form>
                </CardBody>
            </Card>
            </div>
        </div>
    );
};

export default Login;