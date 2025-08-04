import {Component, DestroyRef, inject} from '@angular/core';
import {PanelComponent} from '../../../components/panel/panel.component';
import {DropdownSelectComponent} from '../../../components/dropdown-select/dropdown-select.component';
import {ButtonComponent} from '../../../components/button/button.component';
import {RandomGeneratorService} from '../../../services/random-generator/random-generator.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../domain/store/app.state';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TileEntitiesSelectors} from '../../../domain/store/tiles/tile.selectors';
import {Tile} from '../../../domain/model/tile.interface';

@Component({
  selector: 'app-tile-generator',
  imports: [
    PanelComponent,
    DropdownSelectComponent,
    ButtonComponent
  ],
  templateUrl: './tile-generator.component.html',
  styleUrl: './tile-generator.component.scss'
})
export class TileGeneratorComponent {

  //#region Fields

  private _destroyedRef = inject(DestroyRef);

  public options: string[] = [];
  protected _option1? = '';
  protected _option2? = '';
  private _output = '';

  public get output(): string {
    return this._output;
  }

  public set output(value: string) {
    this._output = value;
  }

  public get option1(): string | undefined {
    return this._option1;
  };

  public get option2(): string | undefined {
    return this._option2;
  };

  public set option1(value: string) {
    this._option1 = value;
  }

  public set option2(value: string) {
    this._option2 = value;
  }

  //#endregion Fields

  //#region Lifecycle

  constructor(
    private randomService: RandomGeneratorService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    // Fetch all tiles from store to include custom tiles
    this.store.select(TileEntitiesSelectors.all).pipe(
      takeUntilDestroyed(this._destroyedRef),
    ).subscribe(tiles => {
      this.options = tiles.map(tile => tile.name);
    });
  }

  //#endregion Lifecycle

  //#region Methods

  public async generate() {
    try {
      this.output = await this.randomService.generateTilePrompt(this.option1, this.option2);
    } catch (error) {
      console.error('Error generating tile prompt:', error);
      this.output = 'An error occurred while generating the prompt.';
    }
  }

  disableGenerate() {
    return this.option1 == '' && this.option2 == '';
  }

  //#endregion Methods
}
