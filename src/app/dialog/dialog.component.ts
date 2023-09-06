import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  songTypeList = ["Male Solo", "Female Solo", "Duet", "Duet Corus"];
  songForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      movie: ['', Validators.required],
      song: ['', Validators.required],
      music_director: ['', Validators.required],
      o_male_signers: ['', Validators.required],
      o_female_singers: ['', Validators.required],
      year: ['', Validators.required],
      r_male_signers: ['', Validators.required],
      r_female_singers: ['', Validators.required],
      episode_number: ['', Validators.required],
      song_start_time: ['', Validators.required],
      song_end_time: ['', Validators.required],
      yt_index: ['', Validators.required],
      song_type: ['', Validators.required],
      channel_name: ['', Validators.required]
    })
  }

  addSong(){
    //console.log(this.songForm.value);

    if(this.songForm.valid){
      this.api.postSong(this.songForm.value)
      .subscribe({
        next:(res) =>{
          alert("Song added successfully!");
          this.songForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the product!")
        }
      })
    }


  }

}
