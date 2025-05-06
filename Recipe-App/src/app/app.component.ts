import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatExpansionModule,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Website';
  currentDate : string = '';
  currentTime : string = ''
  list = Array.from({length:3},()=>({
    task:'',startTime:'',endTime:''
  }))
  disableSave:boolean = true;
  public showSchedule1 = false;
 public data : any =[
  {
    "APP":"APP1","URL":"http://localhost:1712/","Status":"11-4-2025","Response":"2secs"
  },
  {
    "APP":"APP1","URL":"http://localhost:2317/","Status":"10-04-2025","Response":"5secs"
  },
  {
    "APP":"APP1","URL":"http://localhost:1723/","Status":"09-4-205","Response":"23secs"
  },
  {
    "APP":"APP1","URL":"http://localhost:1005/","Status":"11-4-2025","Response":"10secs"
  }
]

public showData:boolean=false;
  
  constructor(){
  }

  ngOnInit(){
    this.currentDate = new Date().toLocaleDateString('en-us',{day:'2-digit',month:'2-digit',year:'2-digit',weekday:'short'});
    this.currentTime = new Date().toLocaleTimeString();
  
    setInterval(()=>{
      this.currentTime = new Date().toLocaleTimeString()
    },1000);
 
  }
show(){
  this.showData = true
}

back(){
  this.showData=false
}
  isSave(){

   let all  = this.list.every(item=>{
    if( item.task.trim() !== '' && item.startTime.trim() !== '' && item.endTime.trim() !== ''){
         this.disableSave = false;
    }
   
    console.log("IS SAVE method", this.disableSave,item.task,item.startTime,item.endTime);
   }    
  );
  }

  showSchedule(){
    this.showSchedule1 = true;

  }

  addSchedule(){
    console.log("add schedule")
    this.list.push({task:'',startTime:'',endTime:''})
    this.isSave();
    console.log("add ",this.disableSave);
  }

  removeSchedule(index:any){
    if(index>0)
    {
      console.log("remove schedule",index)
      this.list.splice(index,1);
    }
    // this.isSave();
    // console.log("remove ",this.disableSave);
  }

 
}
