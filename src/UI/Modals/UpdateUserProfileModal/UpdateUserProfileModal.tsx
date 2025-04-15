import { JSX } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { Label } from '../../components/Label/Label';
import { z } from 'zod';
import { useForm, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData<T extends z.ZodObject<any>> = z.infer<T>;

export interface ModalConfig<T extends z.ZodObject<any>> {
  title: string;
  libelText: string;
  inputPlaceholder: string;
  field: Path<FormData<T>>;
  schema: T;
  type: 'name' | 'avatar';
}

interface UpdateUserProfileModalProps<T extends z.ZodObject<any>> {
  isOpen: boolean;
  config: ModalConfig<T>;
  onClose: () => void;
  onConfirm: (data: FormData<T>) => Promise<void>;
}

const UpdateUserProfileModal = <T extends z.ZodObject<any>>({
  isOpen,
  config,
  onClose,
  onConfirm,
}: UpdateUserProfileModalProps<T>): JSX.Element | null => {
  if (!isOpen) return null;

  const { title, libelText, inputPlaceholder, field, schema } = config;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData<T>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData<T>) => {
    await onConfirm(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Label
            title={libelText}
            errorText={errors[field]?.message?.toString()}
          >
            <TextInput
              {...register(field)}
              placeholder={inputPlaceholder}
              disabled={isSubmitting}
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button variant="outlined" disabled={isSubmitting} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} buttonType="submit">
            Save
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default UpdateUserProfileModal;
