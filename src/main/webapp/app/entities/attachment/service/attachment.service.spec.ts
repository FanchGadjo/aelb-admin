import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAttachment, Attachment } from '../attachment.model';

import { AttachmentService } from './attachment.service';

describe('Attachment Service', () => {
  let service: AttachmentService;
  let httpMock: HttpTestingController;
  let elemDefault: IAttachment;
  let expectedResult: IAttachment | IAttachment[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AttachmentService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      fileContentType: 'image/png',
      file: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Attachment', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Attachment()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Attachment', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          file: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Attachment', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          file: 'BBBBBB',
        },
        new Attachment()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Attachment', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          file: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Attachment', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAttachmentToCollectionIfMissing', () => {
      it('should add a Attachment to an empty array', () => {
        const attachment: IAttachment = { id: 123 };
        expectedResult = service.addAttachmentToCollectionIfMissing([], attachment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(attachment);
      });

      it('should not add a Attachment to an array that contains it', () => {
        const attachment: IAttachment = { id: 123 };
        const attachmentCollection: IAttachment[] = [
          {
            ...attachment,
          },
          { id: 456 },
        ];
        expectedResult = service.addAttachmentToCollectionIfMissing(attachmentCollection, attachment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Attachment to an array that doesn't contain it", () => {
        const attachment: IAttachment = { id: 123 };
        const attachmentCollection: IAttachment[] = [{ id: 456 }];
        expectedResult = service.addAttachmentToCollectionIfMissing(attachmentCollection, attachment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(attachment);
      });

      it('should add only unique Attachment to an array', () => {
        const attachmentArray: IAttachment[] = [{ id: 123 }, { id: 456 }, { id: 85830 }];
        const attachmentCollection: IAttachment[] = [{ id: 123 }];
        expectedResult = service.addAttachmentToCollectionIfMissing(attachmentCollection, ...attachmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const attachment: IAttachment = { id: 123 };
        const attachment2: IAttachment = { id: 456 };
        expectedResult = service.addAttachmentToCollectionIfMissing([], attachment, attachment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(attachment);
        expect(expectedResult).toContain(attachment2);
      });

      it('should accept null and undefined values', () => {
        const attachment: IAttachment = { id: 123 };
        expectedResult = service.addAttachmentToCollectionIfMissing([], null, attachment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(attachment);
      });

      it('should return initial array if no Attachment is added', () => {
        const attachmentCollection: IAttachment[] = [{ id: 123 }];
        expectedResult = service.addAttachmentToCollectionIfMissing(attachmentCollection, undefined, null);
        expect(expectedResult).toEqual(attachmentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
