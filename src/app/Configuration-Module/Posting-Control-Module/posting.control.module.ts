import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostingControlComponent} from "./component/posting-control.component";




const routes: Routes = [
    {path: '', component: PostingControlComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        PostingControlComponent
    ],
    exports: [RouterModule],
    providers: []
})

export class PostingControlModule {}
