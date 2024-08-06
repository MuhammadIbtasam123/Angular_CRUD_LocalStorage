import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe',
  standalone: true
})
export class UserPipePipe implements PipeTransform {

  transform(firstName: string, lastName?: string): unknown {
    return `${firstName.slice(0,1).toUpperCase()} ${lastName.slice(0,1).toUpperCase()}`;
  }

}
