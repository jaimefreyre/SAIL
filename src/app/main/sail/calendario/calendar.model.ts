export class EventRef {
  id? = undefined;
  url: string;
  title: string = '';
  start: string;
  end: string;
  allDay = false;
  color: string;
  calendar: '';
  extendedProps = {
    location: '',
    description: '',
    addGuest: []
  };
}

export class listcalendarioServer {
  calendarioServer
}
export class calendarioServer {
  allDay: false
  color: string;
  description: string;
  end: string;
  id: number;
  resourceIds: number;
  selectable: boolean;
  start: string;
  textColor: string;
  title: string;
}