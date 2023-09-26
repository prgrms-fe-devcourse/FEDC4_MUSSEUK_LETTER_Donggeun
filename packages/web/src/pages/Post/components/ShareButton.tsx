import { LinkIcon } from '@chakra-ui/icons';
import { ButtonProps, IconButton, useToast } from '@chakra-ui/react';

const ShareButton = ({ ...props }: ButtonProps) => {
  const toast = useToast();

  const handleClick = async () => {
    try {
      await window.navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      await copyToClipboard(window.location.href);
    } finally {
      toast({
        title: '링크가 복사되었어요!',
        status: 'success',
        position: 'top'
      });
    }
  };

  return (
    <IconButton
      aria-label="링크"
      colorScheme="primary"
      variant={'outline'}
      size="lg"
      icon={<LinkIcon />}
      onClick={handleClick}
      {...props}
    />
  );
};

const getDummyTextarea = () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.display = 'fixed';

  return textarea;
};

const isClipboardCommandSupported = () => document.queryCommandSupported?.('copy') ?? false;

const copyToClipboard = (text: string) => {
  return new Promise<boolean>((resolve) => {
    const rootElement = document.body;

    if (isClipboardCommandSupported()) {
      const textarea = getDummyTextarea();
      textarea.value = text;

      rootElement.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand('copy');
      rootElement.removeChild(textarea);
      resolve(true);
      return;
    }

    resolve(false);
    return;
  });
};

export default ShareButton;
