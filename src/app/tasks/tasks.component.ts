import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private showToggle:boolean = false;
  private tasks:any;
  constructor(private dataService:DataService) { }

  showData(){
      this.showToggle = !this.showToggle;
      console.log(this.showToggle);
      return this.showToggle;
  }

    addTask(taskName, dateStart, dateFinish){
        this.dataService.sendData({taskName:taskName, dateStart:dateStart, dateFinish:dateFinish })
            .subscribe(
                data=>console.log(data)
            );
    }

  ngOnInit() {
    this.dataService.getData()
        .subscribe(
            (data:any)=>{
              console.log(data);
              this.tasks = data;
            }
        );
  }
}
