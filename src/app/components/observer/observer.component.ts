import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  asyncScheduler,
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  observeOn,
  bindCallback,
  of,
  defer,
  timer,
  empty,
  from,
  fromEvent,
  generate,
  interval,
  range,
  throwError,
  iif,
  combineLatest,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css'],
})
export class ObserverComponent implements OnInit, AfterViewInit {
  name: string = '';

  constructor() {
    /* console.log('3'); */
  }

  ngAfterViewInit(): void {
    /* console.log('2'); */
    /*   asyncScheduler.schedule(() => {
      this.name = 'Ahmet';
    }); */
  }

  ngOnInit(): void {
    /*  this.NormalSubject() */
    /*   this.BehaviourSubject() */
    /*  this.ReplaySubject() */
    /* this.AsyncSubject() */
    /*  console.log(1); */
    /*  this.Schedule(); */
    /* this.Ajax(); */
    /*  this.Defer() */
    /*  this.Sayilar(); */
    /*  this.FromEvent(); */
    /*  this.Generate() */
    /*  this.Interval() */
    /*  this.Of() */
    /* this.Range() */
    /* this.ThrowError() */
    /* this.Timer() */
   /*  this.Iif(); */
   this.CombineLatest()
  }

  /* Subject birden fazla observerin observablede tanımlayabiliriz */
  NormalSubject() {
    const subject = new Subject();
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    /* kaldıgı yerden devam eder */
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.next(7);
  }

  BehaviourSubject() {
    let data: any = 'Umit';
    const subject = new BehaviorSubject(data);
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    /* akıstaki bir onceki data yı alır */
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.next(7);
  }

  ReplaySubject() {
    /* istenldigi kadar onceki veriyi alabiliyoruz */
    /* kac tane geriden alıcaksan onceden bildir */
    const subject = new ReplaySubject(2);
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.next(7);
  }

  AsyncSubject() {
    /* akıstaki son veriyi verir */
    /* akısı complete etmen gerekiyor */
    const subject = new AsyncSubject();
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    subject.next(7);
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.complete();
  }

  /* Schedule */
  /* zamanlayıcı gorevi gorur */

  Schedule() {
    console.log('Schedular kullanılmayan ****');
    const observable = new Observable((data) => {
      data.next(1);
      data.next(3);
      data.next(5);
      data.complete();
    });

    observable.subscribe((data) => console.log(data));
    console.log('schedular kullanılmayan');
    console.log('*********************');

    console.log('schedular kullanılan*******');
    const observable2 = new Observable((data) => {
      data.next(1);
      data.next(2);
      data.next(3);
      data.complete();
    }).pipe(observeOn(asyncScheduler));
    observable2.subscribe((data) => console.log(data));

    console.log('schedular kullanılan*******');
  }

  /* Operatorler */
  /* Rxjs olay ve veri kaynaklarını abone olunabilir(subscribe) nesnelere (observable) donusturup bunlar uzerinden oparetorler vasıtasıyla donusumler ve etkiler gerceklestirilir.*/

  /* ajax */
  Ajax() {
    ajax
      .getJSON('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => console.log(data));

    ajax('https://jsonplaceholder.typicode.com/posts').subscribe((data) =>
      console.log(data)
    );

    ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
    });
  }

  /* bindCallback */

  /* defer operatoru */

  Defer() {
    //of observable olusturur
    const obs1 = of(new Date());

    /* defer subscribe oldugum anda olusturulur */
    const obs2 = defer(() => of(new Date()));

    timer(5000).subscribe(() => {
      obs1.subscribe((data) => console.log(data));
      obs2.subscribe(function (data) {
        console.log(data);
      });
    });
  }

  /* empty */
  /* bos bir observable nesnesi doner */

  /* from */
  /* herhangi bir diziyi alıp geriye observable donduren bir operator */

  Sayilar() {
    const sayilar = [5, 10, 15];
    const obs = from(sayilar);
    obs.subscribe((data) => console.log(data));

    const araclar = new Map<string, number>();
    araclar.set('Klavye', 1);
    araclar.set('Mouse', 2);
    araclar.set('Monitor', 3);
    const obs2 = from(araclar);
    obs2.subscribe((data) => console.log(data));
  }

  /* fromEvent */

  FromEvent() {
    const button = document.getElementsByTagName('button')[0];
    /* const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
      console.log('tiklandı');
    }); */

    const obs = fromEvent(button, 'click');
    obs.subscribe((e) => console.log(e));
  }

  /* generate */
  /* verilen şarta göre döngü oluşturarak Observable donduren bir operator */
  Generate() {
    let obs = generate(
      100,
      (x) => x > 0,
      (x) => x - 3
    );
    obs.subscribe((data) => console.log(data));
  }

  /* Interval */
  Interval() {
    const obs = interval(5000);
    obs.subscribe((data) => console.log(data, 'merhaba'));
  }

  /* of */
  /* verilen herhangi bir turden degerleri observable nesnesine donusturur */
  Of() {
    let obs = of(1, 2, 3);
    obs.subscribe((res) => console.log(res));
  }

  /* range */
  /* belirli bir aralıkta dizisel deger yayan obseevable nesnesidir */
  Range() {
    const obs = range(555, 50);
    obs.subscribe((data) => console.log(data));
  }

  ThrowError() {
    const obs = throwError(new Error('Ornek bir hata'));
    obs.subscribe((data) => console.log(data));
  }

  /* timer */
  /* milisaniye cinsinden belirtilen süre kadar sonra akışı yayacak olan observable nesnesi dondurur */
  Timer() {
    const obs = timer(3000, 250);
    obs.subscribe((data) => console.log(data));
  }

  /* iif */
  /* iki observale arasında şarta bağlı seçim yapar */
  Iif() {
    let state: boolean = true;
    const obs = iif(() => state, of(3, 5, 7), of(10, 11, 12));
    obs.subscribe((data) => console.log(data));
    state = false;
    obs.subscribe((data) => console.log(data));
  }


  /* Join Creation Operators */
  /* birden fazla observable nesnesi varsa bunları harmanlayarak kullanıyoruz */

  /* combineLaters */
  /* verilen tüm observablelerin akıştaki en sonuncu değerini yakalar */

  CombineLatest(){
    const obs1 = timer(1500,1000);
    const obs2 = of(5,10,15);
    const obs3 = of(1,2,3);
   const combine = combineLatest(obs1, obs2, obs3);
   combine.subscribe(res => console.log(res)
   )

  }




}
