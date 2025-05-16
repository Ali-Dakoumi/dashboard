import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateAvatarGradient, getInitials } from '@/lib/utils/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: {
    imageUrl?: string;
    name?: string | null;
    email?: string | null;
  } | null;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  user = {
    imageUrl: '',
    name: '',
    email: ''
  }
}: UserAvatarProfileProps) {
  const initials = getInitials(user?.name || '');
  const gradientStyle = {
    background: generateAvatarGradient(user?.name || user?.email || 'User')
  };

  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={user?.name || ''} />
        <AvatarFallback className='rounded-lg' style={gradientStyle}>
          <span className='text-primary-foreground'>{initials}</span>
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>{user?.name || 'User'}</span>
          <span className='text-muted-foreground truncate text-xs'>
            {user?.email || ''}
          </span>
        </div>
      )}
    </div>
  );
}
